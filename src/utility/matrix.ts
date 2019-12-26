
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
  getCell(rowIndex: number, columnIndex: number): T {
    return this.store[rowIndex][columnIndex];
  }
  getColumn(index: number): T[] {
    return this.store.map(row => row[index]);
  }
  getRow(index: number): T[] {
    return this.store[index];
  }
  slice(startRow: number, startColumn: number, endRow: number, endColumn: number): T[][] {
    return this.store.slice(startRow, endRow).map(row => row.slice(startColumn, endColumn));
  }
}
