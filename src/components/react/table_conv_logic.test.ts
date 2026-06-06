import { describe, expect, it } from 'vitest';
import { csvToTable, jsonToTable, type CsvInputOption, type JsonInputOption } from './table_conv_logic';

const defaultCsvInputOption: CsvInputOption = {
  type: 'csv',
  delimiter: { type: 'auto' },
  quoted: true,
  escapedDoubleQuote: true,
}

const defaultJsonInputOption: JsonInputOption = {
  type: 'json',
}

describe('csvToTable', () => {
  it('parses comma separated rows', () => {
    expect(csvToTable('a,b,c\n1,2,3', defaultCsvInputOption)).toEqual([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
    ]);
  });

  it('uses tab delimiter when the input contains tabs', () => {
    expect(csvToTable('a\tb\tc\n1\t2\t3', defaultCsvInputOption)).toEqual([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
    ]);
  });

  it('keeps delimiters inside quoted cells', () => {
    expect(csvToTable('"a,b",c\n"1,2",3', defaultCsvInputOption)).toEqual([
      ['a,b', 'c'],
      ['1,2', '3'],
    ]);
  });

  it('parses empty lines as empty cells', () => {
    expect(csvToTable('a,b\n\nc,d', defaultCsvInputOption)).toEqual([
      ['a', 'b'],
      [''],
      ['c', 'd'],
    ]);
  });

  it('handles surrogate pairs without splitting characters', () => {
    expect(csvToTable('🍣,"🍺,🍵"', defaultCsvInputOption)).toEqual([['🍣', '🍺,🍵']]);
  });
});

describe('jsonToTable', () => {
  it('parses a two-dimensional string array', () => {
    expect(jsonToTable('[["a","b","c"],["1","2","3"]]', defaultJsonInputOption)).toEqual([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
    ]);
  });

  it('stringifies non-string cells', () => {
    expect(
      jsonToTable(
        '[[1,true,null,{"key":"value"},["nested","array"]],["text"]]', defaultJsonInputOption,
      ),
    ).toEqual([
      ['1', 'true', 'null', '{"key":"value"}', '["nested","array"]'],
      ['text'],
    ]);
  });

  it('parses empty rows', () => {
    expect(jsonToTable('[[],["a"]]', defaultJsonInputOption)).toEqual([[], ['a']]);
  });

  it('throws when the top-level JSON value is not an array', () => {
    expect(() => jsonToTable('{"rows":[["a"]]}', defaultJsonInputOption)).toThrow(
      'JSON が配列でありません',
    );
  });

  it('throws when a row is not an array', () => {
    expect(() => jsonToTable('[["a"],"b"]', defaultJsonInputOption)).toThrow(
      'JSON が2次元配列でありません',
    );
  });
});
