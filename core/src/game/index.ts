import {
  assertValidIndex,
  assertValidNumber,
  assertValidValue,
} from '../utility/type-assertions';

type Cell = {
  name: CellName;
  row: RowOrColumnNumber;
  column: RowOrColumnNumber;
  given: boolean;
  value: CellValue | null;
  fill(value: CellValue | null): void;
};

function makeCellName(
  row: RowOrColumnNumber,
  column: RowOrColumnNumber,
): Cell['name'] {
  return `r${row}c${column}`;
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
  value: CellValue | null,
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

function makeBoard(given: Array<Array<number | undefined | null>>) {
  const cell: Partial<Record<Cell['name'], Cell>> = {};
  const cellList: Cell[] = [];
  given.forEach((row, i) => {
    row.forEach((cellValue = null, j) => {
      // Ensure that these outside values are aligned with what we are expecting.
      if (cellValue !== null) assertValidValue(cellValue);
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
        data[rowIndex][columnIndex] = cell.value || undefined;
        return data;
      }, []);
    },
  };
}

export function makeGame(given: Array<Array<number | undefined>>) {
  const board = makeBoard(given);

  function fillCell(cellName: CellName, value: CellValue | null) {
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
