export interface Position {
  rowIndex: number;
  columnIndex: number;
};
interface ForEachCallback<ItemType> {
  (cell: ItemType, position: Position, matrix: Matrix<ItemType>): void;
}
interface MapCallback<ItemType> {
  (cell: ItemType, position: Position, matrix: Matrix<ItemType>): ItemType;
}
export class Matrix<ItemType> {
  #store: ItemType[][];

  constructor(height: number, width: number, fill?: ItemType);
  constructor(start: ItemType[][]);
  constructor();
  constructor(startOrHeight?: number | ItemType[][], width?: number, fill?: ItemType) {
    if (typeof width === 'number' && typeof startOrHeight === 'number') {
      const height = startOrHeight;
      this.#store = Array.from({ length: height }).map(() => {
        let row: ItemType[] = Array.from({ length: width })
        if (fill) {
          row = row.fill(fill);
        }
        return row;
      });
    } else if (Array.isArray(startOrHeight)) {
      this.#store = startOrHeight;
    } else {
      this.#store = [[]];
    }
  }
  forEach(cb: ForEachCallback<ItemType>): void {
    for (const [rowIndex, row] of this.#store.entries()) {
      for (const [columnIndex, cell] of row.entries()) {
        cb(cell, {rowIndex, columnIndex}, this);
      }
    }
  }
  getCell(rowIndex: number, columnIndex: number): ItemType {
    return this.#store[rowIndex][columnIndex];
  }
  setCell(rowIndex: number, columnIndex: number, item: ItemType) {
    this.#store[rowIndex][columnIndex] = item;
  }
  getColumn(index: number): ItemType[] {
    return this.#store.map(row => row[index]);
  }
  getRow(index: number): ItemType[] {
    return this.#store[index];
  }
  map(cb: MapCallback<ItemType>): Matrix<ItemType> {
    return new Matrix(
      this.#store.map((row, rowIndex) => row.map((cell, columnIndex) => cb(cell, {rowIndex, columnIndex}, this)))
    );
  }
  slice(startRow: number, startColumn: number, endRow: number, endColumn: number): Matrix<ItemType> {
    return new Matrix(this.#store.slice(startRow, endRow).map(row => row.slice(startColumn, endColumn)));
  }
  toJSON() {
    return this.#store;
  }
}
