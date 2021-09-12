import { GameControls, loadGame, UIGame } from '../../core/src/ui';

const rootEl = document.createElement('div');
var originalCellTemplate: HTMLTemplateElement = document.querySelector(
  '#cell-template',
)!;
var originalBoxTemplate: HTMLTemplateElement = document.querySelector(
  '#box-template',
)!;
document.body.appendChild(rootEl);

const queueRender = (() => {
  let previouslyEnqueued = -1;

  return (cb: () => void) => {
    cancelAnimationFrame(previouslyEnqueued);

    previouslyEnqueued = requestAnimationFrame(cb);
  };
})();

type ElementOptions = {
  classList?: string[];
};
function createElement<ElementType extends keyof HTMLElementTagNameMap>(
  elementName: ElementType,
  options: ElementOptions = {},
): HTMLElementTagNameMap[ElementType] {
  const { classList = [] } = options;
  const el = document.createElement(elementName);
  classList.forEach((name) => el.classList.add(name));

  return el;
}
function fillUI(game: UIGame) {
  const board = createElement('div', { classList: ['board'] });
  const cellGrid = createElement('div', { classList: ['cell-grid'] });
  const boxGrid = createElement('div', { classList: ['box-grid'] });

  for (var i = 0; i < 9; i++) {
    const boxTemplate = originalBoxTemplate.content.cloneNode(true);
    boxGrid.appendChild(boxTemplate);
  }
  board.appendChild(boxGrid);

  game.board.forEachCell((cell) => {
    const template = originalCellTemplate.content.cloneNode(
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
    cellGrid.appendChild(template);
  });

  board.appendChild(cellGrid);

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
