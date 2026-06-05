import { describe, expect, it } from 'vitest';

import { csvToTable, jsonToTable, type InputTypeCsv, type InputTypeJson } from './TableConv';

const defaultInputTypeCsv: InputTypeCsv = {
  type: 'csv',
  delimiter: { type: 'auto' },
  quoted: true,
  escapedDoubleQuote: true,
}

const defaultInputTypeJson: InputTypeJson = {
  type: 'json',
}

describe('csvToTable', () => {
  it('parses comma separated rows', () => {
    expect(csvToTable('a,b,c\n1,2,3', defaultInputTypeCsv)).toEqual([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
    ]);
  });

  it('uses tab delimiter when the input contains tabs', () => {
    expect(csvToTable('a\tb\tc\n1\t2\t3', defaultInputTypeCsv)).toEqual([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
    ]);
  });

  it('keeps delimiters inside quoted cells', () => {
    expect(csvToTable('"a,b",c\n"1,2",3', defaultInputTypeCsv)).toEqual([
      ['a,b', 'c'],
      ['1,2', '3'],
    ]);
  });

  it('parses empty lines as empty cells', () => {
    expect(csvToTable('a,b\n\nc,d', defaultInputTypeCsv)).toEqual([
      ['a', 'b'],
      [''],
      ['c', 'd'],
    ]);
  });

  it('handles surrogate pairs without splitting characters', () => {
    expect(csvToTable('🍣,"🍺,🍵"', defaultInputTypeCsv)).toEqual([['🍣', '🍺,🍵']]);
  });
});

describe('jsonToTable', () => {
  it('parses a two-dimensional string array', () => {
    expect(jsonToTable('[["a","b","c"],["1","2","3"]]', defaultInputTypeJson)).toEqual([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
    ]);
  });

  it('stringifies non-string cells', () => {
    expect(
      jsonToTable(
        '[[1,true,null,{"key":"value"},["nested","array"]],["text"]]', defaultInputTypeJson,
      ),
    ).toEqual([
      ['1', 'true', 'null', '{"key":"value"}', '["nested","array"]'],
      ['text'],
    ]);
  });

  it('parses empty rows', () => {
    expect(jsonToTable('[[],["a"]]', defaultInputTypeJson)).toEqual([[], ['a']]);
  });

  it('throws when the top-level JSON value is not an array', () => {
    expect(() => jsonToTable('{"rows":[["a"]]}', defaultInputTypeJson)).toThrow(
      'JSON が配列でありません',
    );
  });

  it('throws when a row is not an array', () => {
    expect(() => jsonToTable('[["a"],"b"]', defaultInputTypeJson)).toThrow(
      'JSON が2次元配列でありません',
    );
  });
});
