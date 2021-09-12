import { assertValidCellName } from './type-assertions';

describe('assertValidCellName', () => {
  it('does not throw on valid names', () => {
    const valid = ['r1c1'];
    valid.forEach((val) => {
      expect(() => assertValidCellName(val)).not.toThrow();
    });
  });
  it('throws on invalid names', () => {
    const invalid = ['', 5, undefined, null, 'r0c3', 'r3c0'];
    invalid.forEach((val) => {
      expect(() => assertValidCellName(val)).toThrow();
    });
  });
});
