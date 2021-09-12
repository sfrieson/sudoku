import { Board } from '../file-type/Adapter';
import * as ss from '../file-type/simple-sudoku';
import { makeGame } from '../game';
import {
  assertValidCellName,
  checkValidValue,
} from '../utility/type-assertions';

function makeGameState(
  activeCells: Set<CellName>,
  selectionMode: SelectionMode,
  board: ReturnType<typeof makeGame>['board'],
) {
  return {
    activeCells,
    selectionMode,
    board,
  };
}

export type GameControls = ReturnType<typeof initGame>;

type EventGameInitialized = {
  type: 'GameInitialized';
  controls: GameControls;
};

export type UIGame = ReturnType<typeof makeGameState>;
type EventNewState = {
  type: 'NewState';
  game: UIGame;
};

type GameEventHandler = {
  (e: GameEvent): void;
};
type GameEvent = EventNewState | EventGameInitialized;
const events = {
  handlers: new Set<GameEventHandler>(),
  emit(event: GameEvent) {
    events.handlers.forEach((handler) => handler(event));
  },
  subscribe: (handler: GameEventHandler) => {
    events.handlers.add(handler);
  },
};

type SelectionMode = 'single-select';
type InputMode = 'attempt';

function initGame(givens: Board) {
  const game = makeGame(givens);
  let state: {
    activeCells: Set<CellName>;
    selectionMode: SelectionMode;
    inputMode: InputMode;
  } = {
    activeCells: new Set(),
    selectionMode: 'single-select',
    inputMode: 'attempt',
  };

  function toggleCellFocus(nextFocusedCellNames: string) {
    assertValidCellName(nextFocusedCellNames);
    if (state.selectionMode === 'single-select') {
      state.activeCells = new Set([nextFocusedCellNames]);
    }
    events.emit({
      type: 'NewState',
      game: makeGameState(state.activeCells, state.selectionMode, game.board),
    });
  }

  let inputMode: InputMode = 'attempt';
  function changeInputMode(nextInputMode: InputMode) {
    inputMode = nextInputMode;
    events.emit({
      type: 'NewState',
      game: makeGameState(state.activeCells, state.selectionMode, game.board),
    });
  }

  function inputCellValue(cellValue: number | null) {
    if (!checkValidValue(cellValue)) return;
    state.activeCells.forEach((cellName) => {
      game.fillCell(cellName, cellValue);
    });
    events.emit({
      type: 'NewState',
      game: makeGameState(state.activeCells, state.selectionMode, game.board),
    });
  }

  events.emit({
    type: 'NewState',
    game: makeGameState(state.activeCells, state.selectionMode, game.board),
  });

  return {
    toggleCellFocus,
    changeInputMode,
    inputCellValue,
    subscribe: events.subscribe,
  };
}

export function loadGame(handler: GameEventHandler) {
  const file = `.1.|739|.2.
27.|.8.|9.1
.46|..2|7.8
-----------
.27|.98|...
...|175|4.2
491|...|..7
-----------
3..|85.|1..
1.9|3..|...
...|9..|86.`;

  events.subscribe(handler);
  const given = ss.read(file);

  const gameControls = initGame(given);

  events.emit({ type: 'GameInitialized', controls: gameControls });
}
