/* 表形式のデータの相互変換を行うウェブアプリ */

import { useDebounce, useLocalStorage } from '@uidotdev/usehooks';
import { useState } from 'react';

type InputType = 'csv' | 'json';

function inputTypeSelector(ty: InputType, setTy: (ty: InputType) => void) {
  return (
    <select value={ty} onChange={(e) => setTy(e.target.value as InputType)}>
      <option value="csv">CSV</option>
      <option value="json">JSON</option>
    </select>
  );
}

type OutputType =
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

function outputTypeSelector(ty: OutputType, setTy: (ty: OutputType) => void) {
  return (
    <select value={ty} onChange={(e) => setTy(e.target.value as OutputType)}>
      <option value="tsv-no-quote">CSV (タブ区切り、クォート無)</option>
      <option value="tsv-quote">CSV (タブ区切り、クォート有)</option>
      <option value="csv-no-quote">CSV (カンマ区切り、クォート無)</option>
      <option value="csv-quote">CSV (カンマ区切り、クォート有)</option>
      <option value="latex">LaTeX</option>
      <option value="latex-hline">LaTeX (罫線あり)</option>
      <option value="latex-tabular">LaTeX (tabular 環境)</option>
      <option value="latex-tabular-hline">
        LaTeX (tabular 環境、罫線あり)
      </option>
      <option value="json">JSON</option>
      <option value="json-minify">JSON (Minify)</option>
    </select>
  );
}

type Table = string[][];

function convert(inputType: InputType, outputType: OutputType, text: string) {
  let table: Table;
  switch (inputType) {
    case 'csv':
      table = csvToTable(text);
      break;
    case 'json':
      table = jsonToTable(text);
      break;
    default:
      throw new Error(`不明な入力タイプです: ${inputType}`);
  }

  switch (outputType) {
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
      throw new Error(`不明な出力タイプです: ${outputType}`);
  }
}

function csvToTable(csv: string): Table {
  const lines = csv.split('\n', -1);
  const delimiter = csv.includes('\t') ? '\t' : ',';

  let state: 'inside-quote' | 'outside-quote' = 'outside-quote';

  const table: Table = [];
  for (const line of lines) {
    state = 'outside-quote';
    const row = [];
    let startIdx = 0;

    // サロゲートペアを考慮して1文字ずつ分割
    const chars = Array.from(line);

    for (let i = 0; i < chars.length; ++i) {
      if (chars[i] === '"' && chars[i - 1] !== '\\') {
        if (state === 'inside-quote') {
          state = 'outside-quote';
        } else {
          state = 'inside-quote';
          // 開始の " をスキップ
          ++startIdx;
        }
      } else if (chars[i] === delimiter && state === 'outside-quote') {
        // 終了の " をスキップ
        const end = chars[i - 1] === '"' ? i - 1 : i;
        row.push(chars.slice(startIdx, end).join(''));
        startIdx = i + 1;
      }
    }

    // 終了の " をスキップ
    const end =
      chars[chars.length - 1] === '"' ? chars.length - 1 : chars.length;
    row.push(chars.slice(startIdx, end).join(''));

    if (row.length === 1 && row[0].length === 0) {
      table.push([]);
    } else {
      table.push(row);
    }
  }
  return table;
}

function jsonToTable(json: string): Table {
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

export const TableConv: React.FC = () => {
  const [inputType, setInputType] = useLocalStorage<InputType>(
    'apps-table-input-type',
    'csv',
  );
  const [outputType, setOutputType] = useLocalStorage<OutputType>(
    'apps-table-output-type',
    'tsv-no-quote',
  );
  const [inputText, setInputText] = useState('');
  const debouncedInputText = useDebounce(inputText, 100);

  let outputText = '';
  let error = false;
  try {
    outputText = convert(inputType, outputType, debouncedInputText);
  } catch (e) {
    error = true;
    outputText = (e as Error).message;
  }

  return (
    <form className="row">
      <div className="col-12 col-6-md">
        <h2>入力</h2>
        {inputTypeSelector(inputType, setInputType)}
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          rows={10}
          autoComplete="on"
          // biome-ignore lint/a11y/noAutofocus:
          autoFocus
          spellCheck="false"
          style={{ resize: 'vertical' }}
        />
      </div>
      <div className="col-12 col-6-md">
        <h2>出力</h2>
        {outputTypeSelector(outputType, setOutputType)}
        <textarea
          value={outputText}
          rows={10}
          readOnly
          style={{ resize: 'vertical' }}
          className={error ? 'bd-error text-error' : ''}
          onFocus={(e) => e.currentTarget.select()}
        />
      </div>
    </form>
  );
};
