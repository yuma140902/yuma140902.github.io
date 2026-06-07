import { Table, Type, Utf8, type Vector, vectorFromArray } from 'apache-arrow';
import Papa from 'papaparse';

export type InputOption = CsvInputOption;
export type CsvInputOption = {
  type: 'csv';
  delimiter: { type: 'literal'; literal: string } | { type: 'auto' };
  quoted: boolean;
  escapedDoubleQuote: boolean;
  parseAsString: boolean;
  header: boolean;
};

export type OutputOption =
  | 'csv-no-quote'
  | 'csv-quote'
  | 'tsv-no-quote'
  | 'tsv-quote'
  | 'latex'
  | 'latex-hline'
  | 'latex-tabular'
  | 'latex-tabular-hline'
  | 'json'
  | 'json-minify';

export function convert(
  inputOption: InputOption,
  outputOption: OutputOption,
  text: string,
) {
  let table: Table;
  switch (inputOption.type) {
    case 'csv':
      table = csvToTable(text, inputOption);
      break;
    default:
      throw new Error(`不明な入力タイプです: ${inputOption}`);
  }

  switch (outputOption) {
    case 'csv-no-quote':
      return tableToCsv(table, ',', false);
    case 'csv-quote':
      return tableToCsv(table, ',', true);
    case 'tsv-no-quote':
      return tableToCsv(table, '\t', false);
    case 'tsv-quote':
      return tableToCsv(table, '\t', true);
    case 'latex':
      return tableToLatex(table, false, false);
    case 'latex-hline':
      return tableToLatex(table, true, false);
    case 'latex-tabular':
      return tableToLatex(table, false, true);
    case 'latex-tabular-hline':
      return tableToLatex(table, true, true);
    case 'json':
      return tableToJson(table, false);
    case 'json-minify':
      return tableToJson(table, true);
    default:
      throw new Error(`不明な出力タイプです: ${outputOption}`);
  }
}

function ppWithoutHeaderToArrowTable(table: unknown[][]): Table {
  const columns = Iterator.from(table)
    .map((row) => row.length)
    .reduce((a, b) => Math.max(a, b), 0);

  // biome-ignore lint/suspicious/noExplicitAny: 変換の過程で型が不明なため
  const obj: Record<number, any> = {};
  for (let colIndex = 0; colIndex < columns; ++colIndex) {
    const col = table.map((row) => row[colIndex] ?? null);
    // biome-ignore lint/suspicious/noExplicitAny: 変換の過程で型が不明なため
    let v: Vector<any> | undefined;
    try {
      // infer type
      v = vectorFromArray(col);
    } catch (e) {
      if (e instanceof TypeError) v = vectorFromArray(col, new Utf8());
    }
    obj[colIndex] = v;
  }
  return new Table(obj);
}

function ppWithHeaderToArrowTable(
  table: Record<string, unknown[]>[],
  columnNames: string[],
): Table {
  console.log('from', table, columnNames);
  // biome-ignore lint/suspicious/noExplicitAny: 変換の過程で型が不明なため
  const obj: Record<string, any> = {};
  for (let colIndex = 0; colIndex < columnNames.length; ++colIndex) {
    const col = table.map((row) => row[columnNames[colIndex]] ?? null);
    // biome-ignore lint/suspicious/noExplicitAny: 変換の過程で型が不明なため
    let v: Vector<any> | undefined;
    try {
      // infer type
      v = vectorFromArray(col);
    } catch (e) {
      if (e instanceof TypeError) v = vectorFromArray(col, new Utf8());
    }
    obj[columnNames[colIndex]] = v;
  }
  return new Table(obj);
}

export function csvToTable(csv: string, option: CsvInputOption): Table {
  const result = Papa.parse<(string | number | boolean)[]>(csv, {
    delimiter:
      option.delimiter.type === 'literal'
        ? option.delimiter.literal
        : undefined,
    quoteChar: option.quoted ? '"' : '\0',
    escapeChar: option.escapedDoubleQuote ? '"' : '\0',
    skipEmptyLines: false,
    dynamicTyping: !option.parseAsString,
    header: option.header,
  });
  const errors = result.errors.filter(
    (error) => error.code !== 'UndetectableDelimiter',
  );

  if (errors.length > 0) {
    const error = errors[0];
    throw new Error(
      error.row == null
        ? error.message
        : `${error.message} (${error.row + 1}行目)`,
    );
  }

  if (result.data.length === 0) {
    return new Table({});
  } else if (Array.isArray(result.data[0])) {
    return ppWithoutHeaderToArrowTable(result.data);
  } else {
    return ppWithHeaderToArrowTable(
      result.data as unknown as Record<string, unknown[]>[],
      result.meta.fields ?? [],
    );
  }
}

function tableToCsv(table: Table, delimiter: string, quote: boolean): string {
  const cellStr = (cell: unknown): string => {
    const q = quote ? '"' : '';
    if (cell == null) {
      return q + q;
    } else {
      let s = String(cell);
      if (quote) {
        s = s.replaceAll('"', '""');
      }
      return q + s + q;
    }
  };

  const rows: string[][] = [];
  for (let i = 0; i < table.numRows; ++i) {
    rows.push([]);
  }

  for (let col = 0; col < table.numCols; ++col) {
    const column = table.getChildAt(col);
    if (column == null) {
      continue;
    }
    for (let row = 0; row < table.numRows; ++row) {
      const cell = column.get(row);
      rows[row].push(cellStr(cell));
    }
  }

  const rowStrs: string[] = [];
  for (let i = 0; i < rows.length; ++i) {
    rowStrs.push(rows[i].join(delimiter));
  }

  return rowStrs.join('\n');
}

function tableToLatex(table: Table, hline: boolean, tabular: boolean): string {
  let output = '';
  if (tabular) {
    const alignments = Array.from({ length: table.numCols }).map((_, col) => {
      const column = table.getChildAt(col);
      console.log('column', column);
      console.log('type', column?.type);
      if (column == null) {
        return 'c';
      } else if (
        column.type.typeId === Type.Int ||
        column.type.typeId === Type.Float
      ) {
        return 'r';
      } else {
        return 'c';
      }
    });

    output += '\\begin{tabular}{';
    output += alignments.join('');
    output += '}';
    if (hline) {
      output += ' \\hline';
    }
    output += '\n';
  }

  const rows: string[][] = [];
  for (let i = 0; i < table.numRows; ++i) {
    rows.push([]);
  }

  for (let col = 0; col < table.numCols; ++col) {
    const column = table.getChildAt(col);
    if (column == null) {
      continue;
    }
    for (let row = 0; row < table.numRows; ++row) {
      const cell = column.get(row);
      rows[row].push(cell);
    }
  }

  const rowStrs: string[] = [];
  for (let i = 0; i < rows.length; ++i) {
    // biome-ignore lint/style/useTemplate: テンプレートリテラルを使用しないほうが可読性が高い
    rowStrs.push(rows[i].join(' & ') + ' \\\\' + (hline ? ' \\hline' : ''));
  }

  output += rowStrs.join('\n');

  if (tabular) {
    output += '\n\\end{tabular}';
  }

  return output;
}

function tableToJson(table: Table, minify: boolean): string {
  return minify ? JSON.stringify(table) : JSON.stringify(table, undefined, 2);
}
