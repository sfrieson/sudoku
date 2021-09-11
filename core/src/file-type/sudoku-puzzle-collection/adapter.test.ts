import * as fs from 'fs';
import * as path from 'path';

import { read } from './';

const collection = fs
  .readFileSync(path.resolve(__dirname, 'examples', 'eight.sdm'), {
    encoding: 'utf-8',
  })
  .trim();

const firstPuzzle = [
  [undefined, 1, 6, 4, undefined, undefined, undefined, undefined, undefined],
  [
    2,
    undefined,
    undefined,
    undefined,
    undefined,
    9,
    undefined,
    undefined,
    undefined,
  ],
  [4, undefined, undefined, undefined, undefined, undefined, undefined, 6, 2],
  [undefined, 7, undefined, 2, 3, undefined, 1, undefined, undefined],
  [
    1,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    3,
  ],
  [undefined, undefined, 3, undefined, 8, 7, undefined, 4, undefined],
  [9, 6, undefined, undefined, undefined, undefined, undefined, undefined, 5],
  [
    undefined,
    undefined,
    undefined,
    8,
    undefined,
    undefined,
    undefined,
    undefined,
    7,
  ],
  [undefined, undefined, undefined, undefined, undefined, 6, 8, 2, undefined],
];

const thirdPuzzle = [
  [7, 6, undefined, 5, undefined, undefined, undefined, undefined, undefined],
  [
    undefined,
    undefined,
    undefined,
    undefined,
    6,
    undefined,
    undefined,
    undefined,
    8,
  ],
  [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    4,
    undefined,
    3,
  ],
  [2, undefined, undefined, 4, undefined, undefined, 8, undefined, undefined],
  [
    undefined,
    8,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    3,
    undefined,
  ],
  [undefined, undefined, 5, undefined, undefined, 1, undefined, undefined, 7],
  [
    8,
    undefined,
    9,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
  [
    6,
    undefined,
    undefined,
    undefined,
    1,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
  [undefined, undefined, undefined, undefined, undefined, 3, undefined, 4, 1],
];
describe('sudoku puzzle collection reader', () => {
  it('reads the first file of a collection', () => {
    expect(read(collection)).toEqual(firstPuzzle);
  });
  it('reads the selected file from the collection', () => {
    expect(read(collection, { index: 2 })).toEqual(thirdPuzzle);
  });
  it('reads the entire the collection', () => {
    const boardCollection = read(collection, { all: true });
    expect(boardCollection[0]).toEqual(firstPuzzle);
    expect(boardCollection[2]).toEqual(thirdPuzzle);
  });
});
