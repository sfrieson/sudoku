export type CellValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type RowOrColumnNumber = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type RowOrColumnIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export type CellName = `r${RowOrColumnNumber}c${RowOrColumnNumber}`;
type Cell = {
  name: CellName;
  row: RowOrColumnNumber;
  column: RowOrColumnNumber;
  given: boolean;
  value?: number;
  fill(value: Cell['value']): void;
};

function makeCellName(
  row: RowOrColumnNumber,
  column: RowOrColumnNumber,
): Cell['name'] {
  return `r${row}c${column}`;
}

function assertValidIndex(index: number): asserts index is RowOrColumnIndex {
  if (index < 0 || index > 8) {
    throw new Error('Index supplied is out of range.');
  }
}

export function assertValidValue(
  value?: number,
): asserts value is CellValue | undefined {
  if (typeof value !== 'undefined' && (value < 1 || value > 9)) {
    throw new Error('Value is not valid');
  }
}

function assertValidNumber(
  number: number,
): asserts number is RowOrColumnNumber {
  if (number < 1 || number > 9) {
    throw new Error('Number supplied is out of range.');
  }
}

function convertIndexToNumber(index: number): RowOrColumnNumber {
  assertValidIndex(index);
  const number = index + 1;
  assertValidNumber(number);
  return number;
}

interface CellOptions {
  given?: boolean;
}
function makeCell(
  value: CellValue | undefined,
  rowIndex: RowOrColumnIndex,
  columnIndex: RowOrColumnIndex,
  options: CellOptions,
): Cell {
  const row = convertIndexToNumber(rowIndex);
  const column = convertIndexToNumber(columnIndex);

  const cell: Cell = {
    name: makeCellName(row, column),
    row,
    column,
    given: !!options.given,
    value,
    fill: (value) => {
      if (cell.given) {
        return;
      }
      cell.value = value;
    },
  };

  return cell;
}

function makeBoard(given: Array<Array<number | undefined>>) {
  const cell: Partial<Record<Cell['name'], Cell>> = {};
  const cellList: Cell[] = [];
  given.forEach((row, i) => {
    row.forEach((cellValue, j) => {
      // Ensure that these outside values are aligned with what we are expecting.
      assertValidValue(cellValue);
      assertValidIndex(i);
      assertValidIndex(j);

      const c = makeCell(cellValue, i, j, { given: !!cellValue });
      cell[c.name] = c;
      cellList.push(c);
    });
  });

  return {
    cell: cell as Required<typeof cell>,
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

export function makeGame(given: Array<Array<number | undefined>>) {
  const board = makeBoard(given);

  function fillCell(cellName: Cell['name'], value: Cell['value']) {
    board.cell[cellName].fill(value);
  }

  function check(): boolean {
    const checks: {
      rows: Record<number, Record<number, boolean>>;
      columns: Record<number, Record<number, boolean>>;
    } = { rows: {}, columns: {} };
    let valid = true;
    board.forEachCell((cell) => {
      if (!valid) return;
      if (!cell.value) {
        valid = false;
        return;
      }
      if (!checks.rows[cell.row]) {
        checks.rows[cell.row] = {};
      }
      if (checks.rows[cell.row][cell.value]) {
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
    check,
  };
}
