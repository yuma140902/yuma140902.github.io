import { describe, expect, it } from 'vitest';

import { csvToTable } from './TableConv';

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
