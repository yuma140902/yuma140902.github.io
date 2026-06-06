/* 表形式のデータの相互変換を行うウェブアプリ */

import { useDebounce, useLocalStorage } from '@uidotdev/usehooks';
import { useState } from 'react';
import './TableConv.css';
import {
  type CsvInputOption,
  convert,
  type InputOption,
  type OutputOption,
} from './table_conv_logic';

const LOCAL_STORAGE_PREFIX = 'apps-table-';

const defaultInputOption: InputOption = {
  type: 'csv',
  delimiter: { type: 'auto' },
  quoted: true,
  escapedDoubleQuote: true,
};

const defaultOutputOption: OutputOption = 'tsv-no-quote';

function inputOptionForm(
  option: InputOption,
  setOption: (option: InputOption) => void,
) {
  const selectInputType = (type: InputOption['type']) => {
    switch (type) {
      case 'csv':
        setOption(option.type === 'csv' ? option : defaultInputOption);
        break;
      case 'json':
        setOption({ type: 'json' });
        break;
    }
  };

  return (
    <div className="tc-options">
      <label>
        入力形式
        <select
          value={option.type}
          onChange={(e) =>
            selectInputType(e.target.value as InputOption['type'])
          }
        >
          <option value="csv">CSV</option>
          <option value="json">JSON</option>
        </select>
      </label>
      {option.type === 'csv' && (
        <CsvInputOptionForm option={option} setOption={setOption} />
      )}
    </div>
  );
}

function CsvInputOptionForm({
  option,
  setOption,
}: {
  option: CsvInputOption;
  setOption: (option: CsvInputOption) => void;
}) {
  const setCsvOption = (option: CsvInputOption) => setOption(option);

  return (
    <fieldset className="tc-fieldset">
      <legend>CSV オプション</legend>
      <label>
        区切り文字
        <select
          value={option.delimiter.type}
          onChange={(e) => {
            const type = e.target.value as CsvInputOption['delimiter']['type'];
            setCsvOption({
              ...option,
              delimiter:
                type === 'auto'
                  ? { type: 'auto' }
                  : {
                      type: 'literal',
                      literal:
                        option.delimiter.type === 'literal'
                          ? option.delimiter.literal
                          : ',',
                    },
            });
          }}
        >
          <option value="auto">自動判定</option>
          <option value="literal">指定する</option>
        </select>
      </label>
      {option.delimiter.type === 'literal' && (
        <label>
          文字
          <input
            type="text"
            value={option.delimiter.literal}
            onChange={(e) =>
              setCsvOption({
                ...option,
                delimiter: { type: 'literal', literal: e.target.value },
              })
            }
          />
        </label>
      )}
      <label>
        <input
          type="checkbox"
          checked={option.quoted}
          onChange={(e) =>
            setCsvOption({ ...option, quoted: e.target.checked })
          }
        />
        一部または全部のフィールドが「"」で囲まれている
      </label>
      <label>
        <input
          type="checkbox"
          checked={option.escapedDoubleQuote}
          onChange={(e) =>
            setCsvOption({ ...option, escapedDoubleQuote: e.target.checked })
          }
        />
        フィールド中の「""」を「"」として扱う
      </label>
    </fieldset>
  );
}

function outputOptionForm(
  option: OutputOption,
  setOption: (option: OutputOption) => void,
) {
  return (
    <select
      value={option}
      onChange={(e) => setOption(e.target.value as OutputOption)}
    >
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

export const TableConv: React.FC = () => {
  const [inputOption, setInputOption] = useLocalStorage<InputOption>(
    `${LOCAL_STORAGE_PREFIX}input-option`,
    defaultInputOption,
  );
  const [outputOption, setOutputOption] = useLocalStorage<OutputOption>(
    `${LOCAL_STORAGE_PREFIX}output-option`,
    defaultOutputOption,
  );
  const [inputText, setInputText] = useState('');
  const debouncedInputText = useDebounce(inputText, 100);

  let outputText = '';
  let error = false;
  try {
    outputText = convert(inputOption, outputOption, debouncedInputText);
  } catch (e) {
    error = true;
    outputText = (e as Error).message;
  }

  return (
    <form className="tc-container">
      <div className="tc-controls tc-input-controls">
        <h2>入力</h2>
        {inputOptionForm(inputOption, setInputOption)}
      </div>
      <div className="tc-controls tc-output-controls">
        <h2>出力</h2>
        {outputOptionForm(outputOption, setOutputOption)}
      </div>
      <textarea
        className="tc-input-text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        rows={10}
        autoComplete="on"
        // biome-ignore lint/a11y/noAutofocus: This conversion tool should be ready for immediate typing.
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
