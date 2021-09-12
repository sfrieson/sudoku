import { GameControls, loadGame, UIGame } from '../../core/src/ui';

const rootEl = document.createElement('div');
var originalTemplate: HTMLTemplateElement = document.querySelector(
  '#cell-template',
)!;
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
    const template = originalTemplate.content.cloneNode(
      true,
    ) as DocumentFragment;

    if (cell.value) {
      const textElement = template.querySelector(
        '#cell-number',
      ) as HTMLDivElement;
      textElement.textContent = cell.value.toString();
    }
    const baseCell = template.querySelector('.cell') as HTMLDivElement;

    baseCell.dataset.cellName = cell.name;
    if (game.activeCells.has(cell.name)) {
      baseCell.classList.add('cell--active');
    }
    board.appendChild(template);
  });

  if (rootEl.children.length) {
    rootEl.replaceChild(board, rootEl.children[0]);
  } else {
    rootEl.append(board);
  }
}

function listenForInput(controls: GameControls) {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace') {
      controls.inputCellValue(null);
    }
  });
  document.addEventListener('keypress', (e) => {
    switch (e.key) {
      case 'Backspace':
        controls.inputCellValue(null);
        break;
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9': {
        const num = parseInt(e.key);
        controls.inputCellValue(num);
        break;
      }
      default:
      // none
    }
  });

  document.addEventListener('click', (e) => {
    if (!(e.target instanceof HTMLElement) || !e.target.matches('.cell')) {
      return;
    }

    const cellName = e.target.dataset.cellName;
    if (!cellName) throw new Error('Cell name not found on element');
    controls.toggleCellFocus(cellName);
  });
}

loadGame(function (event) {
  switch (event.type) {
    case 'GameInitialized':
      listenForInput(event.controls);
      break;
    case 'NewState':
      queueRender(() => {
        fillUI(event.game);
      });
      break;
    default:
    // none
  }
});
