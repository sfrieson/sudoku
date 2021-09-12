export function assertValidIndex(
  index: number,
): asserts index is RowOrColumnIndex {
  if (index < 0 || index > 8) {
    throw new Error('Index supplied is out of range.');
  }
}

export function checkValidValue(value: unknown): value is CellValue {
  return typeof value === 'number' && value >= 1 && value <= 9;
}
export function assertValidValue(value: unknown): asserts value is CellValue {
  if (checkValidValue(value)) return;
  throw new Error('Value is not valid');
}

function checkValidNumber(number: unknown): number is RowOrColumnNumber {
  return typeof number === 'number' && number >= 1 && number <= 9;
}
export function assertValidNumber(
  number: number,
): asserts number is RowOrColumnNumber {
  if (checkValidNumber(number)) return;
  throw new Error('Number supplied is out of range.');
}

function checkValidName(name: unknown): name is CellName {
  if (typeof name !== 'string') return false;

  const match = name.match(/^r([1-9])c([1-9])$/);

  if (!match) return false;
  console.log;
  const row = parseInt(match[1], 10);
  const column = parseInt(match[2], 10);

  return checkValidNumber(row) && checkValidNumber(column);
}

export function assertValidCellName(name: unknown): asserts name is CellName {
  if (checkValidName(name)) return;

  throw new Error('Name supplied does not match pattern.');
}
