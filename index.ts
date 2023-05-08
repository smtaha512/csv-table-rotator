const table = [1, 2, 3, 4, 5, 6, 7, 8, 9];

type UniDimensionalTable = number[];
type TwoDTable = UniDimensionalTable[];

function tableLengthSquareRoot(table: UniDimensionalTable): number {
  return Math.sqrt(table.length);
}

function isValid(table: UniDimensionalTable = []): boolean {
  return Number.isInteger(tableLengthSquareRoot(table));
}

function* chunks<T>(arr: T[], n: number): Generator<T[], void> {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

function to2DTable(table: UniDimensionalTable): TwoDTable {
  if (!isValid(table)) {
    return [];
  }

  return [...chunks(table, tableLengthSquareRoot(table))];
}

function generateIntial2DTableForRotation(table: TwoDTable): TwoDTable {
  return [...new Array(table.length)].map((row, idx) => [
    ...new Array(table[idx].length),
  ]);
}

function rotate(table: TwoDTable = []): TwoDTable {
  let rotatedTable = generateIntial2DTableForRotation(table);

  for (let i = 0; i < table.length; i++) {
    for (let j = i; j < table[i].length - i - 1; j++) {
      const index = i < table.length / 2 ? j + 1 : table[i].length - j;
      rotatedTable[i][index] = table[i][j];
    }
  }

  for (let i = 0; i < table.length; i++) {
    let lastItem = null;
    for (let j = 0; j < table[i].length; j++) {
      if (j === table[i].length - 1) {
        lastItem = table[i][j];
        break;
      }
      rotatedTable[i][j + 1] = table[i][j];
    }

    const positionForAddingLastItem = i === table.length - 1 ? 0 : i + 1;
    rotatedTable[positionForAddingLastItem][0] = lastItem;
  }

  return rotatedTable;
}

function flat(table: TwoDTable): UniDimensionalTable {
  const flattenedTable = [];
  for (let i = 0; i < table.length; i++) {
    for (let j = 0; j < table[i].length; j++) {
      flattenedTable[i * table.length + j] = table[i][j];
    }
  }

  return flattenedTable;
}

console.log(flat(rotate([...to2DTable(table)])));
