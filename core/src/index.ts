import * as ss from './file-type/simple-sudoku';
import { makeGame } from './game';

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

const given = ss.read(file);

const game = makeGame(given);

export function show() {
  console.log(ss.write(game.board.toData()));
}

export function fill(cell: any, value: number) {
  game.fillCell(cell, value);
  show();
}
