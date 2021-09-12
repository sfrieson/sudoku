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
      // nonoe
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
