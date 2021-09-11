import * as fs from 'fs';
import * as path from 'path';

import { read, write } from './';

const mdFile = fs
  .readFileSync(path.resolve(__dirname, 'examples', 'md.ss'), {
    encoding: 'utf-8',
  })
  .trim();
const xFile = fs.readFileSync(path.resolve(__dirname, 'examples', 'x.ss'), {
  encoding: 'utf-8',
});

const matrix = [
  [
    1,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    7,
    undefined,
    undefined,
  ],
  [
    undefined,
    2,
    undefined,
    undefined,
    undefined,
    undefined,
    5,
    undefined,
    undefined,
  ],
  [6, undefined, undefined, 3, 8, undefined, undefined, undefined, undefined],
  [
    undefined,
    7,
    8,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    undefined,
    6,
    undefined,
    9,
    undefined,
    undefined,
    undefined,
  ],
  [
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    1,
    4,
    undefined,
  ],
  [undefined, undefined, undefined, undefined, 2, 5, undefined, undefined, 9],
  [
    undefined,
    undefined,
    3,
    undefined,
    undefined,
    undefined,
    undefined,
    6,
    undefined,
  ],
  [
    undefined,
    undefined,
    4,
    undefined,
    undefined,
    undefined,
    undefined,
    undefined,
    2,
  ],
];

describe('simple-sudoku parser', () => {
  it('reads markdown-esque syntax', () => {
    expect(read(mdFile)).toEqual(matrix);
  });
  it('reads a compact version syntax', () => {
    expect(read(xFile)).toEqual(matrix);
  });
  it('converts a matrix to markdown-esque', () => {
    expect(write(matrix)).toEqual(mdFile);
  });
});
