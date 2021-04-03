type RowIndex = number;
type ColumnIndex = number;
type Position = [RowIndex, ColumnIndex];
interface ForEachCallback<ItemType> {
  (cell: ItemType, position: Position, matrix: Matrix<ItemType>): void;
}
interface MapCallback<ItemType> {
  (cell: ItemType, position: Position, matrix: Matrix<ItemType>): ItemType;
}
export default class Matrix<ItemType> {
  private store: ItemType[][];

  constructor(height: number, width: number, fill?: ItemType);
  constructor(start: ItemType[][]);
  constructor();
  constructor(startOrHeight?: number | ItemType[][], width: number = null, fill?: ItemType) {
    if (typeof width === 'number' && typeof startOrHeight === 'number') {
      const height = startOrHeight;
      this.store = Array.from({ length: height }).map(() => {
        let row: ItemType[] = Array.from({ length: width })
        if (fill) {
          row = row.fill(fill);
        }
        return row;
      });
    } else if (Array.isArray(startOrHeight)) {
      this.store = startOrHeight;
    } else {
      this.store = [[]];
    }
  }
  forEach(cb: ForEachCallback<ItemType>): void {
    this.store.forEach((row, rowIndex) => row.forEach((cell, colIndex) => cb(cell, [rowIndex, colIndex], this)));
  }
  getCell(rowIndex: number, columnIndex: number): ItemType {
    return this.store[rowIndex][columnIndex];
  }
  getColumn(index: number): ItemType[] {
    return this.store.map(row => row[index]);
  }
  getRow(index: number): ItemType[] {
    return this.store[index];
  }
  map(cb: MapCallback<ItemType>): Matrix<ItemType> {
    return new Matrix(
      this.store.map((row, rowIndex) => row.map((cell, colIndex) => cb(cell, [rowIndex, colIndex], this)))
    );
  }
  slice(startRow: number, startColumn: number, endRow: number, endColumn: number): Matrix<ItemType> {
    return new Matrix(this.store.slice(startRow, endRow).map(row => row.slice(startColumn, endColumn)));
  }
  toJSON() {
    return this.store;
  }
}
