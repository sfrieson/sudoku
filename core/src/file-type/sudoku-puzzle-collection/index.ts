import { Board } from '../Adapter';

const NEWLINE = '\n';

function parseLine(line: string): Board {
  const board: Board = [];
  let currentRow: Board[0] = [];
  for (let i = 0; i < line.length; i++) {
    if (i % 9 === 0) {
      currentRow = [];
      board.push(currentRow);
    }
    switch (line[i]) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        currentRow.push(parseInt(line[i], 10));
        break;
      default:
        currentRow.push(undefined);
    }
  }

  return board;
}

type Options = {
  index?: number;
  all?: boolean;
};
export function read(file: string, options: Options & { all: true }): Board[];
export function read(file: string, options?: Options): Board;
export function read(
  file: string,
  options: Options = { index: 0, all: false },
) {
  const { all, index } = Object.assign({ index: 0, all: false }, options);
  const lines = file.split(NEWLINE);
  const linesToParse = all ? lines : lines.slice(index, index + 1);
  const boards = linesToParse.map((line) => parseLine(line));
  return all ? boards : boards[0];
}
