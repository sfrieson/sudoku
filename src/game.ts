type Cell = {
  name: 'r1c1' | 'r1c2' | 'r1c3' | 'r1c4' | 'r1c5' | 'r1c6' | 'r1c7' | 'r1c8' | 'r1c9' | 'r2c1' | 'r2c2' | 'r2c3' | 'r2c4' | 'r2c5' | 'r2c6' | 'r2c7' | 'r2c8' | 'r2c9' | 'r3c1' | 'r3c2' | 'r3c3' | 'r3c4' | 'r3c5' | 'r3c6' | 'r3c7' | 'r3c8' | 'r3c9' | 'r4c1' | 'r4c2' | 'r4c3' | 'r4c4' | 'r4c5' | 'r4c6' | 'r4c7' | 'r4c8' | 'r4c9' | 'r5c1' | 'r5c2' | 'r5c3' | 'r5c4' | 'r5c5' | 'r5c6' | 'r5c7' | 'r5c8' | 'r5c9' | 'r6c1' | 'r6c2' | 'r6c3' | 'r6c4' | 'r6c5' | 'r6c6' | 'r6c7' | 'r6c8' | 'r6c9' | 'r7c1' | 'r7c2' | 'r7c3' | 'r7c4' | 'r7c5' | 'r7c6' | 'r7c7' | 'r7c8' | 'r7c9' | 'r8c1' | 'r8c2' | 'r8c3' | 'r8c4' | 'r8c5' | 'r8c6' | 'r8c7' | 'r8c8' | 'r8c9' | 'r9c1' | 'r9c2' | 'r9c3' | 'r9c4' | 'r9c5' | 'r9c6' | 'r9c7' | 'r9c8' | 'r9c9';
  row: number;
  column: number;
  given: boolean;
  value?: number;
  fill(value: Cell['value']): void;
}

function makeCellName (row: number, column: number): Cell['name'] {
  return `r${row}c${column}` as Cell['name'];
}
interface CellOptions {
  given?: boolean;
}
function makeCell (value: number | undefined, rowIndex: number, columnIndex: number, options: CellOptions): Cell {
  const row = rowIndex + 1;
  const column = columnIndex + 1;
  const name = makeCellName(row, column);

  const cell: Cell = {
    name,
    row,
    column,
    given: !!options.given,
    value,
    fill: (value) => {
      if (cell.given) {
        return;
      }
      cell.value = value;
    }
  };

  return cell;
}

function makeBoard (given: Array<Array<number | undefined>>) {
  const cell: Partial<Record<Cell['name'], Cell>> = {};
  const cellList: Cell[] = [];
  given.forEach((row, i) => {
    row.forEach((cellValue, j) => {
      const c = makeCell(cellValue, i, j, { given: !!cellValue });
      cell[c.name] = c;
      cellList.push(c);
    })
  });

  return {
    cell: (cell as Required<typeof cell>),
    forEachCell: (cb: (value: Cell, index: number, array: Cell[]) => void) => {
      cellList.forEach(cb);
    },
    // TODO find a better name
    toData: (): Array<Array<number | undefined>> => {
      return cellList.reduce((data: Array<Array<number | undefined>>, cell) => {
        const rowIndex = cell.row - 1;
        const columnIndex = cell.column - 1;
        if (!data[rowIndex]) {
          data[rowIndex] = [];
        }
        data[rowIndex][columnIndex] = cell.value;
        return data;
      }, []);
    },
  };
}

export function makeGame (given: Array<Array<number | undefined>>) {
  const board = makeBoard(given);

  function fillCell(cellName: Cell['name'], value: Cell['value']) {
    board.cell[cellName].fill(value);
  }

  function check(): boolean {
    const checks: {
      rows: Record<number, Record<number, boolean>>,
      columns: Record<number, Record<number, boolean>>
    } = { rows: {}, columns: {} };
    let valid = true;
    board.forEachCell(cell => {
      if (!valid) return;
      if (!cell.value) {
        valid = false;
        return;
      };
      if (!checks.rows[cell.row]) {
        checks.rows[cell.row] = {};
      }
      if ((checks.rows[cell.row])[cell.value]) {
        valid = false;
        return;
      }
      checks.rows[cell.row][cell.value] = true;

      if (!checks.columns[cell.column]) {
        checks.columns[cell.column] = {};
      }
      if (checks.columns[cell.column][cell.value]) {
        valid = false;
        return;
      }
      checks.columns[cell.column][cell.value] = true;
    });

    return valid;
  }

  return {
    board,
    fillCell,
    check
  };
}
