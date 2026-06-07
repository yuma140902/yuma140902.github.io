import { Type } from 'apache-arrow';
import { describe, expect, it } from 'vitest';
import {
  type CsvInputOption,
  columnToAlignedStringArray,
  csvToTable,
  type IrTable,
  tableToCsv,
  tableToLatex,
} from './table_conv_logic';

const csvInputOption = (partial?: Partial<CsvInputOption>): CsvInputOption => {
  const dflt: CsvInputOption = {
    type: 'csv',
    delimiter: { type: 'auto' },
    quoted: true,
    escapedDoubleQuote: true,
    parseAsString: false,
    header: false,
  };

  return { ...dflt, ...partial };
};

describe('csvToTable', () => {
  const option = (partial?: Partial<CsvInputOption>): CsvInputOption => {
    return csvInputOption(partial);
  };

  function tableToRows({ table }: IrTable): unknown[][] {
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

  it('parses comma separated rows', () => {
    expect(tableToRows(csvToTable('a,b,c\n1,2,3', option()))).toEqual([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
    ]);
  });

  it('uses tab delimiter when the input contains tabs', () => {
    expect(tableToRows(csvToTable('a\tb\tc\n1\t2\t3', option()))).toEqual([
      ['a', 'b', 'c'],
      ['1', '2', '3'],
    ]);
  });

  it('keeps delimiters inside quoted cells', () => {
    expect(tableToRows(csvToTable('"a,b",c\n"1,2",3', option()))).toEqual([
      ['a,b', 'c'],
      ['1,2', '3'],
    ]);
  });

  it('parses empty lines as empty cells', () => {
    expect(tableToRows(csvToTable('a,b\n\nc,d', option()))).toEqual([
      ['a', 'b'],
      [null, null],
      ['c', 'd'],
    ]);
  });

  it('handles surrogate pairs without splitting characters', () => {
    expect(tableToRows(csvToTable('🍣,"🍺,🍵"', option()))).toEqual([
      ['🍣', '🍺,🍵'],
    ]);
  });

  it('数値のみのカラムは float としてパースされる', () => {
    const table = csvToTable('a,1\nb,2\nc,3', option());
    expect(tableToRows(table)).toEqual([
      ['a', 1],
      ['b', 2],
      ['c', 3],
    ]);
    expect(table.table.schema.fields[1].typeId).toEqual(Type.Float);
  });

  it('boolean のみのカラムは boolean としてパースされる', () => {
    const table = csvToTable('a,true\nb,false\nc,true', option());
    expect(tableToRows(table)).toEqual([
      ['a', true],
      ['b', false],
      ['c', true],
    ]);
    expect(table.table.schema.fields[1].typeId).toEqual(Type.Bool);
  });

  it('空のセルは null としてパースされる', () => {
    const table = csvToTable('a,\n,b\n,', option());
    expect(tableToRows(table)).toEqual([
      ['a', null],
      [null, 'b'],
      [null, null],
    ]);
  });

  it('欠損値つきの float カラムは float としてパースされる', () => {
    const table = csvToTable('a,1.5\nb,\nc,3.5', option());
    expect(tableToRows(table)).toEqual([
      ['a', 1.5],
      ['b', null],
      ['c', 3.5],
    ]);
    expect(table.table.schema.fields[1].typeId).toEqual(Type.Float);
  });

  it('parseAsString オプションが true のときはすべてのセルが string としてパースされる', () => {
    const table = csvToTable(
      '1,true\n2,false',
      option({ parseAsString: true }),
    );

    expect(tableToRows(table)).toEqual([
      ['1', 'true'],
      ['2', 'false'],
    ]);
  });

  it('header オプションが true のときは最初の行がヘッダーとして扱われる', () => {
    const table = csvToTable(
      'name,age,active\nAlice,20,true\nBob,30,false',
      option({ header: true }),
    );

    expect(tableToRows(table)).toEqual([
      ['Alice', 20, true],
      ['Bob', 30, false],
    ]);
    expect(table.table.schema.fields.map((field) => field.name)).toEqual([
      'name',
      'age',
      'active',
    ]);
  });

  it('header オプションが true のとき、ヘッダーの順番が維持される', () => {
    const table = csvToTable(
      'zeta,alpha,middle\n1,2,3',
      option({ header: true }),
    );

    expect(tableToRows(table)).toEqual([[1, 2, 3]]);
    expect(table.table.schema.fields.map((field) => field.name)).toEqual([
      'zeta',
      'alpha',
      'middle',
    ]);
  });
});

describe('tableToCsv', () => {
  it('ヘッダー付きテーブルを CSV に変換する', () => {
    const table = csvToTable(
      'name,age\nAlice,20\nBob,30',
      csvInputOption({
        header: true,
      }),
    );

    expect(
      tableToCsv(table, {
        type: 'csv',
        delimiter: 'comma',
        quote: false,
      }),
    ).toEqual('name,age\nAlice,20\nBob,30');
  });

  it('タブ区切りで出力する', () => {
    const table = csvToTable('a,b\n1,2', csvInputOption());

    expect(
      tableToCsv(table, {
        type: 'csv',
        delimiter: 'tab',
        quote: false,
      }),
    ).toEqual('a\tb\n1\t2');
  });

  it('quote オプションが true のときセルを引用し、ダブルクォートをエスケープする', () => {
    const table = csvToTable(
      'name,note\nAlice,"hello ""world"""\nBob,',
      csvInputOption({ header: true, parseAsString: true }),
    );

    expect(
      tableToCsv(table, {
        type: 'csv',
        delimiter: 'comma',
        quote: true,
      }),
    ).toEqual('"name","note"\n"Alice","hello ""world"""\n"Bob",""');
  });
});

describe('tableToLatex', () => {
  it('tabular 環境なしで LaTeX の行に変換する', () => {
    const table = csvToTable(
      'item,count\nApple,3\nOrange,12',
      csvInputOption({
        header: true,
      }),
    );

    expect(
      tableToLatex(table, {
        type: 'latex',
        hline: false,
        tabular: false,
      }),
    ).toEqual(
      [
        ' item  & count  \\\\',
        'Apple  &     3  \\\\',
        'Orange &    12  \\\\',
      ].join('\n'),
    );
  });

  it('ヘッダーなしテーブルを LaTeX の行に変換する', () => {
    const table = csvToTable('Apple,3\nOrange,12', csvInputOption());

    expect(
      tableToLatex(table, {
        type: 'latex',
        hline: false,
        tabular: false,
      }),
    ).toBe(['Apple  &  3  \\\\', 'Orange & 12  \\\\'].join('\n'));
  });

  it('tabular 環境と hline を出力する', () => {
    const table = csvToTable(
      'name,score\nAlice,1.5\nBob,20',
      csvInputOption({
        header: true,
      }),
    );

    expect(
      tableToLatex(table, {
        type: 'latex',
        hline: true,
        tabular: true,
      }),
    ).toEqual(
      [
        '\\begin{tabular}{cr} \\hline',
        'name  & score   \\\\ \\hline',
        'Alice &     1.5 \\\\ \\hline',
        ' Bob  &    20   \\\\ \\hline',
        '\\end{tabular}',
      ].join('\n'),
    );
  });
});

describe('columnToAlignedStringArray', () => {
  it('小数点を揃える', () => {
    expect(columnToAlignedStringArray([1, 20.5, 300], 'dotted')).toEqual([
      '  1  ',
      ' 20.5',
      '300  ',
    ]);
  });

  it('小数点が無いとき', () => {
    expect(columnToAlignedStringArray([1, 20, 300], 'dotted')).toEqual([
      '  1 ',
      ' 20 ',
      '300 ',
    ]);
  });

  it('left', () => {
    expect(columnToAlignedStringArray([1, 20, 300], 'left')).toEqual([
      '1  ',
      '20 ',
      '300',
    ]);
  });

  it('center', () => {
    expect(columnToAlignedStringArray([1, 20, 300], 'center')).toEqual([
      ' 1 ',
      '20 ',
      '300',
    ]);
  });

  it('全角文字', () => {
    expect(
      columnToAlignedStringArray(['あいうえおABC', 'ABC漢字', 1234], 'left'),
    ).toEqual([
      'あいうえおABC', //
      'ABC漢字      ', //
      '1234         ',
    ]);
  });

  it('全角文字の中央揃え', () => {
    expect(
      columnToAlignedStringArray(['あいうえおABC', 'ABC漢字', 1234], 'center'),
    ).toEqual([
      'あいうえおABC', //
      '   ABC漢字   ', //
      '    1234     ',
    ]);
  });
});
