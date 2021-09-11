import { Matrix } from './';

describe('matrix', () => {
  it('accepts a 2D array as an initial value', () => {
    const twoD = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ];
    const m = new Matrix(twoD);
    m.forEach((cell, { rowIndex, columnIndex }) => {
      expect(twoD[rowIndex][columnIndex]).toEqual(cell);
    });
  });

  it('accepts height, width, and an initial value to create', () => {
    expect(new Matrix(2, 2, 'hi')).toEqual(
      new Matrix([
        ['hi', 'hi'],
        ['hi', 'hi'],
      ]),
    );
    expect(new Matrix(2, 2)).toEqual(
      new Matrix([
        [undefined, undefined],
        [undefined, undefined],
      ]),
    );
  });

  it('initializes with a 1x1 if nothing else is supplied', () => {
    expect(new Matrix()).toEqual(new Matrix([[]]));
  });

  it('allows you to forEach the values', () => {
    let values = '';
    const expected = '123456789';
    const m = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);

    m.forEach((cell) => (values += cell));
    expect(values).toBe(expected);
  });

  it('allows you to map over each value', () => {
    const m = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    const expected = new Matrix([
      [2, 4, 6],
      [8, 10, 12],
      [14, 16, 18],
    ]);
    expect(m.map((cell) => cell * 2)).toEqual(expected);
  });

  it('serializes with JSON.stringify()', () => {
    const m = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    expect(JSON.stringify(m)).toEqual('[[1,2,3],[4,5,6],[7,8,9]]');
  });

  it('returns rows', () => {
    const m = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    expect(m.getRow(0)).toEqual([1, 2, 3]);
  });

  it('returns columns', () => {
    const m = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    expect(m.getColumn(0)).toEqual([1, 4, 7]);
  });

  it('returns cells', () => {
    const m = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    expect(m.getCell(1, 1)).toEqual(5);
  });

  it('slices a window of the matrix', () => {
    const m = new Matrix([
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ]);
    const expected = new Matrix([
      [2, 3],
      [5, 6],
    ]);
    expect(m.slice(0, 1, 2, 3)).toEqual(expected);
  });

  it('allows you to set cell values', () => {
    const m = new Matrix([
      [1, 2],
      [3, 4],
    ]);
    m.setCell(1, 1, 5);

    const expected = new Matrix([
      [1, 2],
      [5, 4],
    ]);
    expect(m).toEqual(expected);
  });
});
