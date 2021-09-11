import { Board } from '../Adapter';

export function read(data: string): Board {
  let _data = data.trim();
  const board: Board = [];

  let currentRow: Board[0] = [];
  board.push(currentRow);

  for (let i = 0; i < _data.length; i++) {
    const char = _data[i];
    switch (char) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        currentRow.push(parseInt(char, 10));
        break;
      case '.':
      case 'x':
      case 'X':
      case '0':
        currentRow.push(undefined);
        break;
      case '\n':
      case '\r':
        if (currentRow.length === 9) {
          currentRow = [];
          board.push(currentRow);
        }
        break;
      case '|':
      case '-':
      default:
        // skip
        break;
    }
  }

  return board;
}

export function write(data: Board): string {
  let file = '';
  for (let rowI = 0; rowI < data.length; rowI++) {
    const row = data[rowI];
    for (let colI = 0; colI < row.length; colI++) {
      file += row[colI] || '.';
      if (colI === 2 || colI === 5) {
        file += '|';
      }
    }

    file += '\n';

    if (rowI === 2 || rowI === 5) {
      file += '-----------\n';
    }
  }

  return file.trim();
}
