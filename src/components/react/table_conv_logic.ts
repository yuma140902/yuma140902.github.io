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
  | CsvOutputOption
  | LatexOutputOption
  | DebugOutputOption;
type CsvOutputOption = {
  type: 'csv';
  delimiter: 'comma' | 'tab';
  quote: boolean;
};
type LatexOutputOption = {
  type: 'latex';
  hline: boolean;
  tabular: boolean;
};
type DebugOutputOption = {
  type: 'debug';
};

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

  switch (outputOption.type) {
    case 'csv':
      return tableToCsv(table, outputOption);
    case 'latex':
      return tableToLatex(table, outputOption);
    case 'debug':
      return tableToJson(table);
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
  return new Table(obj).select(columnNames); // keep the column order
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

function tableToCsv(table: Table, option: CsvOutputOption): string {
  const delimiter = option.delimiter === 'comma' ? ',' : '\t';
  const cellStr = (cell: unknown): string => {
    const q = option.quote ? '"' : '';
    if (cell == null) {
      return q + q;
    } else {
      let s = String(cell);
      if (option.quote) {
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

function tableToLatex(table: Table, option: LatexOutputOption): string {
  let output = '';
  if (option.tabular) {
    const alignments = Array.from({ length: table.numCols }).map((_, col) => {
      const typeId = table.schema.fields[col].typeId;
      if (typeId === Type.Int || typeId === Type.Float) {
        return 'r';
      } else {
        return 'c';
      }
    });

    output += '\\begin{tabular}{';
    output += alignments.join('');
    output += '}';
    if (option.hline) {
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
    rowStrs.push(
      // biome-ignore lint/style/useTemplate: テンプレートリテラルを使用しないほうが可読性が高い
      rows[i].join(' & ') + ' \\\\' + (option.hline ? ' \\hline' : ''),
    );
  }

  output += rowStrs.join('\n');

  if (option.tabular) {
    output += '\n\\end{tabular}';
  }

  return output;
}

function tableToJson(table: Table): string {
  return JSON.stringify(table, undefined, 2);
}
