type RowIndex = number;
type ColumnIndex = number;
type Position = [RowIndex, ColumnIndex];
interface ForEachCallback<T> {
  (cell: T, position: Position, matrix: Matrix<T>): void;
}
interface MapCallback<T> {
  (cell: T, position: Position, matrix: Matrix<T>): T;
}
export default class Matrix<T> {
  private store: T[][];
  constructor(height: number, width: number, fill?: T);
  constructor(start: T[][]);
  constructor();
  constructor(startOrHeight?: number | T[][], width: number = null, fill: T = null) {
    if (typeof width === 'number') {
      const height = startOrHeight as number;
      this.store = Array.from({ length: height }).map(() => (Array.from({ length: width }) as T[]).fill(fill));
    } else if (startOrHeight) {
      this.store = startOrHeight as T[][];
    } else {
      this.store = [[]];
    }
  }
  forEach(cb: ForEachCallback<T>): void {
    this.store.forEach((row, rowIndex) => row.forEach((cell, colIndex) => cb(cell, [rowIndex, colIndex], this)));
  }
  getCell(rowIndex: number, columnIndex: number): T {
    return this.store[rowIndex][columnIndex];
  }
  getColumn(index: number): T[] {
    return this.store.map(row => row[index]);
  }
  getRow(index: number): T[] {
    return this.store[index];
  }
  map(cb: MapCallback<T>): Matrix<T> {
    return new Matrix(
      this.store.map((row, rowIndex) => row.map((cell, colIndex) => cb(cell, [rowIndex, colIndex], this)))
    );
  }
  slice(startRow: number, startColumn: number, endRow: number, endColumn: number): Matrix<T> {
    return new Matrix(this.store.slice(startRow, endRow).map(row => row.slice(startColumn, endColumn)));
  }
  toJSON() {
    return this.store;
  }
}
