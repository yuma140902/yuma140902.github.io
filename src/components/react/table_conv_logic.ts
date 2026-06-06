import Papa from "papaparse";

export type InputOption = CsvInputOption | JsonInputOption;
export type CsvInputOption = {
  type: 'csv';
  delimiter: { type: 'literal', literal: string } | { type: 'auto' };
  quoted: boolean;
  escapedDoubleQuote: boolean;
};
export type JsonInputOption = {
  type: 'json';
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

export type Table = string[][];

export function convert(inputOption: InputOption, outputOption: OutputOption, text: string) {
  let table: Table;
  switch (inputOption.type) {
    case 'csv':
      table = csvToTable(text, inputOption);
      break;
    case 'json':
      table = jsonToTable(text, inputOption);
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

export function csvToTable(csv: string, option: CsvInputOption): Table {
  const result = Papa.parse<string[]>(csv, {
    delimiter:
      option.delimiter.type === 'literal' ? option.delimiter.literal : undefined,
    quoteChar: option.quoted ? '"' : '\0',
    escapeChar: option.escapedDoubleQuote ? '"' : '\0',
    skipEmptyLines: false,
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

  return result.data;
}

export function jsonToTable(json: string, _option: JsonInputOption): Table {
  const obj = JSON.parse(json);
  const table: Table = [];

  if (!Array.isArray(obj)) {
    throw new Error('JSON が配列でありません');
  }
  for (const row of obj) {
    if (!Array.isArray(row)) {
      throw new Error('JSON が2次元配列でありません');
    }
    const stringRow: string[] = [];
    for (const cell of row) {
      if (typeof cell === 'string') {
        stringRow.push(cell);
      } else {
        stringRow.push(JSON.stringify(cell));
      }
    }
    table.push(stringRow);
  }
  return table;
}

function tableToCsv(table: Table, delimiter: string, quote: boolean): string {
  const q = quote ? '"' : '';
  return table
    .map((row) => row.map((cell) => q + cell + q).join(delimiter))
    .join('\n');
}

function tableToLatex(table: Table, hline: boolean, tabular: boolean): string {
  const maxCols = table
    .map((row) => row.length)
    .reduce((a, b) => Math.max(a, b), 0);

  let output = '';
  if (tabular) {
    output += '\\begin{tabular}{';
    for (let i = 0; i < maxCols; ++i) {
      output += 'c';
    }
    output += '}';
    if (hline) {
      output += ' \\hline';
    }
    output += '\n';
  }

  output += table
    // biome-ignore lint/style/useTemplate:
    .map((row) => row.join(' & ') + ' \\\\' + (hline ? ' \\hline' : ''))
    .join('\n');

  if (tabular) {
    output += '\n\\end{tabular}';
  }

  return output;
}

function tableToJson(table: Table, minify: boolean): string {
  return minify ? JSON.stringify(table) : JSON.stringify(table, undefined, 2);
}

