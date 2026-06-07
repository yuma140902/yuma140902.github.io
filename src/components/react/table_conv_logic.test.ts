import { type Table, Type } from 'apache-arrow';
import { describe, expect, it } from 'vitest';
import {
  type CsvInputOption,
  csvToTable,
  type JsonInputOption,
  jsonToTable,
} from './table_conv_logic';

const defaultCsvInputOption: CsvInputOption = {
  type: 'csv',
  delimiter: { type: 'auto' },
  quoted: true,
  escapedDoubleQuote: true,
  parseAsString: false,
  header: false,
};

const defaultJsonInputOption: JsonInputOption = {
  type: 'json',
};

function tableToRows(table: Table): unknown[][] {
  const rows: unknown[][] = Array.from({ length: table.numRows }, () => []);

  for (let col = 0; col < table.numCols; ++col) {
    const column = table.getChildAt(col);
    if (column == null) {
      continue;
    }
    for (let row = 0; row < table.numRows; ++row) {
      rows[row].push(column.get(row));
    }
  }

  return rows;
}

describe('csvToTable', () => {
  it('parses comma separated rows', () => {
    expect(
      tableToRows(csvToTable('a,b,c\n1,2,3', defaultCsvInputOption)),
    ).toEqual([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
    ]);
  });

  it('uses tab delimiter when the input contains tabs', () => {
    expect(
      tableToRows(csvToTable('a\tb\tc\n1\t2\t3', defaultCsvInputOption)),
    ).toEqual([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
    ]);
  });

  it('keeps delimiters inside quoted cells', () => {
    expect(
      tableToRows(csvToTable('"a,b",c\n"1,2",3', defaultCsvInputOption)),
    ).toEqual([
      ['a,b', 'c'],
      ['1,2', '3'],
    ]);
  });

  it('parses empty lines as empty cells', () => {
    expect(
      tableToRows(csvToTable('a,b\n\nc,d', defaultCsvInputOption)),
    ).toEqual([
      ['a', 'b'],
      [null, null],
      ['c', 'd'],
    ]);
  });

  it('handles surrogate pairs without splitting characters', () => {
    expect(
      tableToRows(csvToTable('🍣,"🍺,🍵"', defaultCsvInputOption)),
    ).toEqual([['🍣', '🍺,🍵']]);
  });

  it('数値のみのカラムは float としてパースされる', () => {
    const table = csvToTable('a,1\nb,2\nc,3', defaultCsvInputOption);
    expect(tableToRows(table)).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    expect(table.getChildAt(1)?.type.typeId).toEqual(Type.Float);
  });

  it('boolean のみのカラムは boolean としてパースされる', () => {
    const table = csvToTable('a,true\nb,false\nc,true', defaultCsvInputOption);
    expect(tableToRows(table)).toEqual([
      ['a', true],
      ['b', false],
      ['c', true],
    ]);
    expect(table.getChildAt(1)?.type.typeId).toEqual(Type.Bool);
  });

  it('空のセルは null としてパースされる', () => {
    const table = csvToTable('a,\n,b\n,', defaultCsvInputOption);
    expect(tableToRows(table)).toEqual([
      ['a', null],
      [null, 'b'],
      [null, null],
    ]);
  });

  it('欠損値つきの float カラムは float としてパースされる', () => {
    const table = csvToTable('a,1.5\nb,\nc,3.5', defaultCsvInputOption);
    expect(tableToRows(table)).toEqual([
      ['a', 1.5],
      ['b', null],
      ['c', 3.5],
    ]);
    expect(table.getChildAt(1)?.type.typeId).toEqual(Type.Float);
  });
});

describe('jsonToTable', () => {
  it('throws because JSON input is not implemented yet', () => {
    expect(() =>
      jsonToTable('[["a","b","c"],["1","2","3"]]', defaultJsonInputOption),
    ).toThrow('not yet implemented');
  });
});
