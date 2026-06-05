import { describe, expect, it } from 'vitest';

import { csvToTable, jsonToTable } from './TableConv';

describe('csvToTable', () => {
  it('parses comma separated rows', () => {
    expect(csvToTable('a,b,c\n1,2,3')).toEqual([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
    ]);
  });

  it('uses tab delimiter when the input contains tabs', () => {
    expect(csvToTable('a\tb\tc\n1\t2\t3')).toEqual([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
    ]);
  });

  it('keeps delimiters inside quoted cells', () => {
    expect(csvToTable('"a,b",c\n"1,2",3')).toEqual([
      ['a,b', 'c'],
      ['1,2', '3'],
    ]);
  });

  it('does not treat escaped quotes as closing quotes', () => {
    expect(csvToTable('"a\\"b,c",d')).toEqual([['a\\"b,c', 'd']]);
  });

  it('parses empty lines as empty rows', () => {
    expect(csvToTable('a,b\n\nc,d')).toEqual([
      ['a', 'b'],
      [],
      ['c', 'd'],
    ]);
  });

  it('handles surrogate pairs without splitting characters', () => {
    expect(csvToTable('🍣,"🍺,🍵"')).toEqual([['🍣', '🍺,🍵']]);
  });
});

describe('jsonToTable', () => {
  it('parses a two-dimensional string array', () => {
    expect(jsonToTable('[["a","b","c"],["1","2","3"]]')).toEqual([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
    ]);
  });

  it('stringifies non-string cells', () => {
    expect(
      jsonToTable(
        '[[1,true,null,{"key":"value"},["nested","array"]],["text"]]',
      ),
    ).toEqual([
      ['1', 'true', 'null', '{"key":"value"}', '["nested","array"]'],
      ['text'],
    ]);
  });

  it('parses empty rows', () => {
    expect(jsonToTable('[[],["a"]]')).toEqual([[], ['a']]);
  });

  it('throws when the top-level JSON value is not an array', () => {
    expect(() => jsonToTable('{"rows":[["a"]]}')).toThrow(
      'JSON が配列でありません',
    );
  });

  it('throws when a row is not an array', () => {
    expect(() => jsonToTable('[["a"],"b"]')).toThrow(
      'JSON が2次元配列でありません',
    );
  });
});
