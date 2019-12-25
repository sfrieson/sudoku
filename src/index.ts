interface BoardData {
  answers: number[][];
  revealed: boolean[][];
}

const data: BoardData[] = [
  {
    answers: [
      [1,2,3,4,5,6,7,8,9],
      [4,5,6,7,8,9,1,2,3],
      [7,8,9,1,2,3,4,5,6],
      [2,3,4,5,6,7,8,9,1],
      [5,6,7,8,9,1,2,3,4],
      [8,9,1,2,3,4,5,6,7],
      [3,4,5,6,7,8,9,1,2],
      [6,7,8,9,1,2,3,4,5],
      [9,1,2,3,4,5,6,7,8]
    ],
    revealed: [
      [true,false,true,true,false,true,true,false,true],
      [true,false,true,true,false,true,true,false,true],
      [true,false,true,true,false,true,true,false,true],
      [true,false,true,true,false,true,true,false,true],
      [true,false,true,true,false,true,true,false,true],
      [true,false,true,true,false,true,true,false,true],
      [true,false,true,true,false,true,true,false,true],
      [true,false,true,true,false,true,true,false,true],
      [true,false,true,true,false,true,true,false,true],
    ],
  }
];

interface Square {
  answer: number;
  attempt: number;
  column: number;
  notes: Set<number>;
  revealed: boolean;
  row: number;
}

interface Board {
  squares: Square[][];
}

const BoardSize = 9;
const WindowSize = 3;

interface SquareUpdater {
  (update: Partial<Square>): void;
}

interface Model {
  getBoard(): Board;
  updateSquare(row: number, column: number, update: Partial<Square> | SquareUpdater): Board;
}

// - Model
const dataToBoard = (val: BoardData): Board => {
  const { answers: row, revealed } = val;

  return {
    squares: row.map((answers, rowIndex) => answers.map((value, colIndex) => ({
      answer: value,
      attempt: null,
      column: colIndex,
      notes: new Set(),
      revealed: revealed[rowIndex][colIndex],
      row: rowIndex,
    })))
  };
};

// const model: Model = {
//   getBoard () {
//     return dataToBoard(data[0]);
//   }
// }


// - Controller

interface Game {
  board: Board;
  elapsedSeconds: number;
  isComplete: boolean;
  isPaused: boolean;
}

interface Controller {
  init(): void;
  game: Game;
  setAttempt(position: Position, value: number): void;
  setNote(positin: Position, value: number): void;
  view: ViewMethods;
}

let Position: [number, number];
// - View
interface InitOptions {
  onAttemptInput(position: Position, value: number): void;
  onNoteInput(position: Position, value: number, isAdded: boolean): void;
  onPauseClick(isPaused: boolean): void;
}

interface SquareElement extends HTMLDivElement {
  'data-row': string;
  'data-column': string;
}

interface ViewUtils {
  getDataFromEl(el: SquareElement, board: Board): Square;
  renderSquare(data: Square): SquareElement;
  calculateTime(start: number): string;
};

interface SquareEvent {
  currentTarget: SquareElement
}

interface ViewMethods {
  update(game: Game): void;
}

enum InputMode { Attempt, Note }

interface ViewState {
  inputMode: InputMode;
  active: Position;
}

interface StateUpdater {
  (S: ViewState): Partial<ViewState>
}
interface View {
  init(options: InitOptions): ViewMethods;
  current: Game;
  handleKeyPress(event: KeyboardEvent & SquareEvent): void;
  handleSquareClick(event: MouseEvent & SquareEvent): void;
  render(): void;
  setState(update: Partial<ViewState> | StateUpdater): void;
  stageRender(game: Game): void;
}
