import { makeGame } from '../';

describe('makeGame', () => {
  describe('#complete', () => {
    it('detects complete games', () => {
      const completedGame = makeGame([
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, 8],
      ]);

      expect(completedGame.check()).toBe(true);
    });
    it('detects incomplete games', () => {
      const incompleteGame = makeGame([
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, undefined],
      ]);

      expect(incompleteGame.check()).toBe(false);
    });
    it('detects incorrect games', () => {
      const incorrectRow = makeGame([
        [1, 1, 1, 1, 1, 1, 1, 1, 1],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, 8],
      ]);

      expect(incorrectRow.check()).toBe(false);
      const incorrectColumn = makeGame([
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [1, 5, 6, 7, 8, 9, 1, 2, 3],
        [1, 8, 9, 1, 2, 3, 4, 5, 6],
        [1, 3, 4, 5, 6, 7, 8, 9, 1],
        [1, 6, 7, 8, 9, 1, 2, 3, 4],
        [1, 9, 1, 2, 3, 4, 5, 6, 7],
        [1, 4, 5, 6, 7, 8, 9, 1, 2],
        [1, 7, 8, 9, 1, 2, 3, 4, 5],
        [1, 1, 2, 3, 4, 5, 6, 7, 8],
      ]);

      expect(incorrectColumn.check()).toBe(false);
    });
  });
  describe('filling squares', () => {
    it('allows you to fill empty squares and refill squares', () => {
      const game = makeGame([
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, undefined],
      ]);

      game.fillCell('r9c9', 7);
      expect(game.board.cell.r9c9.value).toBe(7);
      game.fillCell('r9c9', 8);
      expect(game.board.cell.r9c9.value).toBe(8);
    });
    it('does not allow you to fill squares that were initially filled', () => {
      const game = makeGame([
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, undefined],
      ]);

      game.fillCell('r1c1', 7);
      expect(game.board.cell.r1c1.value).toBe(1);
    });
  });
  describe('gameBoard', () => {
    it('places numbers where you expect', () => {
      const game = makeGame([
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, undefined],
      ]);

      game.fillCell('r1c1', 7);
      expect(game.board.cell.r1c1.value).toBe(1);
    });
    it('returns the board as a 2D arrray', () => {
      const twoDim = [
        [1, 2, 3, 4, 5, 6, 7, 8, 9],
        [4, 5, 6, 7, 8, 9, 1, 2, 3],
        [7, 8, 9, 1, 2, 3, 4, 5, 6],
        [2, 3, 4, 5, 6, 7, 8, 9, 1],
        [5, 6, 7, 8, 9, 1, 2, 3, 4],
        [8, 9, 1, 2, 3, 4, 5, 6, 7],
        [3, 4, 5, 6, 7, 8, 9, 1, 2],
        [6, 7, 8, 9, 1, 2, 3, 4, 5],
        [9, 1, 2, 3, 4, 5, 6, 7, undefined],
      ];
      expect(makeGame(twoDim).board.toData()).toEqual(twoDim);
    });
  });
});
