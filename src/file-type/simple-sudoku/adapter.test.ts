import { adapter } from './';

describe('simple-sudoku parser', () => {
  it('reads markdown-esque syntax', () => {
    expect(adapter.read(
`1..|...|7..
.2.|...|5..
6..|38.|...
-----------
.78|...|...
...|6.9|...
...|...|14.
-----------
...|.25|..9
..3|...|.6.
..4|...|..2`
    )).toBe([
      [1,undefined,undefined,undefined,undefined,undefined,7,undefined,undefined],
      [undefined,2,undefined,undefined,undefined,undefined,5,undefined,undefined],
      [6,undefined,undefined,3,8,undefined,undefined,undefined,undefined,],
      [undefined,7,8,undefined,undefined,undefined,undefined,undefined,undefined,],
      [undefined,undefined,undefined,6,undefined,9,undefined,undefined,undefined,],
      [undefined,undefined,undefined,undefined,undefined,undefined,1,4,undefined,],
      [undefined,undefined,undefined,6,undefined,9,undefined,undefined,undefined,],
      [undefined,undefined,undefined,undefined,undefined,undefined,1,4,undefined,],
      [undefined,undefined,3,undefined,undefined,undefined,undefined,6,undefined,],
      [undefined,undefined,4,undefined,undefined,undefined,undefined,undefined,2]
    ])
  });
})