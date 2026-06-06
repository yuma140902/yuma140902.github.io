/* 表形式のデータの相互変換を行うウェブアプリ */

import { useDebounce, useLocalStorage } from '@uidotdev/usehooks';
import * as Papa from 'papaparse';
import { useState } from 'react';
import "./TableConv.css";

export type InputType = InputTypeCsv | InputTypeJson;
export type InputTypeCsv = {
  type: 'csv';
  delimiter: { type: 'literal', literal: string } | { type: 'auto' };
  quoted: boolean;
  escapedDoubleQuote: boolean;
};
export type InputTypeJson = {
  type: 'json';
};

const defaultInputType: InputType = {
  type: 'csv',
  delimiter: { type: 'auto' },
  quoted: true,
  escapedDoubleQuote: true,
};

function inputTypeSelector(ty: InputType, setTy: (ty: InputType) => void) {
  const selectInputType = (type: InputType['type']) => {
    switch (type) {
      case 'csv':
        setTy(ty.type === 'csv' ? ty : defaultInputType);
        break;
      case 'json':
        setTy({ type: 'json' });
        break;
    }
  };

  return (
    <div className="tc-options">
      <label>
        入力形式
        <select
          value={ty.type}
          onChange={(e) => selectInputType(e.target.value as InputType['type'])}
        >
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
        </select>
      </label>
      {ty.type === 'csv' && <CsvInputOptions ty={ty} setTy={setTy} />}
    </div>
  );
}

function CsvInputOptions({
  ty,
  setTy,
}: {
  ty: InputTypeCsv;
  setTy: (ty: InputType) => void;
}) {
  const setCsvTy = (nextTy: InputTypeCsv) => setTy(nextTy);

  return (
    <fieldset className="tc-fieldset">
      <legend>CSV オプション</legend>
      <label>
        区切り文字
        <select
          value={ty.delimiter.type}
          onChange={(e) => {
            const type = e.target.value as InputTypeCsv['delimiter']['type'];
            setCsvTy({
              ...ty,
              delimiter:
                type === 'auto'
                  ? { type: 'auto' }
                  : {
                    type: 'literal',
                    literal:
                      ty.delimiter.type === 'literal'
                        ? ty.delimiter.literal
                        : ',',
                  },
            });
          }}
        >
          <option value="auto">自動判定</option>
          <option value="literal">指定する</option>
        </select>
      </label>
      {ty.delimiter.type === 'literal' && (
        <label>
          文字
          <input
            type="text"
            value={ty.delimiter.literal}
            onChange={(e) =>
              setCsvTy({
                ...ty,
                delimiter: { type: 'literal', literal: e.target.value },
              })
            }
          />
        </label>
      )}
      <label>
        <input
          type="checkbox"
          checked={ty.quoted}
          onChange={(e) => setCsvTy({ ...ty, quoted: e.target.checked })}
        />
        一部または全部のフィールドが「"」で囲まれている
      </label>
      <label>
        <input
          type="checkbox"
          checked={ty.escapedDoubleQuote}
          onChange={(e) =>
            setCsvTy({ ...ty, escapedDoubleQuote: e.target.checked })
          }
        />
        フィールド中の「""」を「"」として扱う
      </label>
    </fieldset>
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
  switch (inputType.type) {
    case 'csv':
      table = csvToTable(text, inputType);
      break;
    case 'json':
      table = jsonToTable(text, inputType);
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

export function csvToTable(csv: string, option: InputTypeCsv): Table {
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

export function jsonToTable(json: string, _option: InputTypeJson): Table {
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
    defaultInputType,
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
    <form className="tc-container">
      <div className="tc-controls tc-input-controls">
        <h2>入力</h2>
        {inputTypeSelector(inputType, setInputType)}
      </div>
      <div className="tc-controls tc-output-controls">
        <h2>出力</h2>
        {outputTypeSelector(outputType, setOutputType)}
      </div>
      <textarea
        className="tc-input-text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={10}
        autoComplete="on"
        // biome-ignore lint/a11y/noAutofocus:
        autoFocus
        spellCheck="false"
        style={{ resize: 'vertical' }}
      />
      <textarea
        className={`tc-output-text ${error ? 'bd-error text-error' : ''}`}
        value={outputText}
        rows={10}
        readOnly
        style={{ resize: 'vertical' }}
        onFocus={(e) => e.currentTarget.select()}
      />
    </form>
  );
};
