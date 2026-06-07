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
  parseAsString: false,
  header: true,
};

const defaultOutputOption: OutputOption = {
  type: 'markdown',
};
const defaultCsvOutputOption: Extract<OutputOption, { type: 'csv' }> = {
  type: 'csv',
  delimiter: 'comma',
  quote: true,
};
const defaultLatexOutputOption: Extract<OutputOption, { type: 'latex' }> = {
  type: 'latex',
  hline: false,
  tabular: true,
};
const defaultMarkdownOutputOption: Extract<OutputOption, { type: 'markdown' }> =
  {
    type: 'markdown',
  };
const defaultDebugOutputOption: Extract<OutputOption, { type: 'debug' }> = {
  type: 'debug',
};

function InputOptionForm({
  option,
  setOption,
}: {
  option: InputOption;
  setOption: (option: InputOption) => void;
}) {
  const selectInputType = (type: InputOption['type']) => {
    switch (type) {
      case 'csv':
        setOption(option.type === 'csv' ? option : defaultInputOption);
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
      <label>
        <input
          type="checkbox"
          checked={option.parseAsString}
          onChange={(e) =>
            setCsvOption({ ...option, parseAsString: e.target.checked })
          }
        />
        フィールドの型をすべて文字列として扱う
      </label>
      <label>
        <input
          type="checkbox"
          checked={option.header}
          onChange={(e) =>
            setCsvOption({ ...option, header: e.target.checked })
          }
        />
        1 行目をヘッダー行として扱う
      </label>
    </fieldset>
  );
}

function OutputOptionForm({
  option,
  setOption,
}: {
  option: OutputOption;
  setOption: (option: OutputOption) => void;
}) {
  const selectOutputType = (type: OutputOption['type']) => {
    switch (type) {
      case 'csv':
        setOption(option.type === 'csv' ? option : defaultCsvOutputOption);
        break;
      case 'latex':
        setOption(option.type === 'latex' ? option : defaultLatexOutputOption);
        break;
      case 'markdown':
        setOption(
          option.type === 'markdown' ? option : defaultMarkdownOutputOption,
        );
        break;
      case 'debug':
        setOption(option.type === 'debug' ? option : defaultDebugOutputOption);
        break;
    }
  };

  return (
    <div className="tc-options">
      <label>
        出力形式
        <select
          value={option.type}
          onChange={(e) =>
            selectOutputType(e.target.value as OutputOption['type'])
          }
        >
          <option value="csv">CSV</option>
          <option value="latex">LaTeX</option>
          <option value="markdown">Markdown</option>
          <option value="debug">[デバッグ用] 中間形式</option>
        </select>
      </label>
      {option.type === 'csv' && (
        <CsvOutputOptionForm option={option} setOption={setOption} />
      )}
      {option.type === 'latex' && (
        <LatexOutputOptionForm option={option} setOption={setOption} />
      )}
    </div>
  );
}

function CsvOutputOptionForm({
  option,
  setOption,
}: {
  option: Extract<OutputOption, { type: 'csv' }>;
  setOption: (option: Extract<OutputOption, { type: 'csv' }>) => void;
}) {
  return (
    <fieldset className="tc-fieldset">
      <legend>CSV オプション</legend>
      <label>
        区切り文字
        <select
          value={option.delimiter}
          onChange={(e) =>
            setOption({
              ...option,
              delimiter: e.target.value as Extract<
                OutputOption,
                { type: 'csv' }
              >['delimiter'],
            })
          }
        >
          <option value="tab">タブ</option>
          <option value="comma">カンマ</option>
        </select>
      </label>
      <label>
        <input
          type="checkbox"
          checked={option.quote}
          onChange={(e) => setOption({ ...option, quote: e.target.checked })}
        />
        すべてのフィールドを「"」で囲む
      </label>
    </fieldset>
  );
}

function LatexOutputOptionForm({
  option,
  setOption,
}: {
  option: Extract<OutputOption, { type: 'latex' }>;
  setOption: (option: Extract<OutputOption, { type: 'latex' }>) => void;
}) {
  return (
    <fieldset className="tc-fieldset">
      <legend>LaTeX オプション</legend>
      <label>
        <input
          type="checkbox"
          checked={option.hline}
          onChange={(e) => setOption({ ...option, hline: e.target.checked })}
        />
        罫線を出力する
      </label>
      <label>
        <input
          type="checkbox"
          checked={option.tabular}
          onChange={(e) => setOption({ ...option, tabular: e.target.checked })}
        />
        tabular 環境で囲む
      </label>
    </fieldset>
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
        <InputOptionForm option={inputOption} setOption={setInputOption} />
      </div>
      <div className="tc-controls tc-output-controls">
        <h2>出力</h2>
        <OutputOptionForm option={outputOption} setOption={setOutputOption} />
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
        wrap="off"
      />
    </form>
  );
};
