import { CellName } from '~core/game';
import { GameControls, loadGame, UIGame } from '../../core/src/ui';

const rootEl = document.createElement('div');
var template: HTMLTemplateElement = document.querySelector('#cell-template')!;
document.body.appendChild(rootEl);

const queueRender = (() => {
  let previouslyEnqueued = -1;

  return (cb: () => void) => {
    cancelAnimationFrame(previouslyEnqueued);

    previouslyEnqueued = requestAnimationFrame(cb);
  };
})();

function fillUI(game: UIGame) {
  const board = document.createElement('div');
  board.classList.add('board');
  game.board.forEachCell((cell) => {
    const cellEl = template.content.cloneNode(true) as DocumentFragment;

    if (cell.value) {
      const textElement = cellEl.querySelector(
        '#cell-number',
      ) as HTMLDivElement;
      textElement.textContent = cell.value.toString();
    }
    (cellEl.querySelector('.cell') as HTMLDivElement).dataset.cellName =
      cell.name;
    board.appendChild(cellEl);
  });

  if (rootEl.children.length) {
    rootEl.replaceChild(board, rootEl.children[0]);
  } else {
    rootEl.append(board);
  }
}

function listenForInput(controls: GameControls) {
  document.addEventListener('keypress', (e) => {
    const int = parseInt(e.key);
    if (int) {
      controls.inputCellValue(int);
    }
  });
  document.addEventListener('click', (e) => {
    if (!(e.target instanceof HTMLElement) || !e.target.matches('.cell')) {
      return;
    }
    // TODO make this safer
    const cellName = e.target.dataset.cellName as CellName;
    controls.toggleCellFocus(cellName);
  });
}

loadGame(function (event) {
  switch (event.type) {
    case 'GameInitialized':
      console.log('ready');
      listenForInput(event.controls);
      break;
    case 'NewState':
      queueRender(() => {
        console.log('render');
        fillUI(event.game);
      });
      break;
    default:
    // none
  }
});
