const table = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  22, 23, 24,
];

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

  for (let i = 0; i < table.length / 2; i++) {
    rotatedTable[i][0] = table[i + 1][0];

    for (let j = 0; j < table.length - i - 1; j++) {
      const index = i < Math.floor(table.length / 2) ? j + 1 : j - table.length;
      rotatedTable[i][index] = table[i][j];
    }

    rotatedTable[i + 1][table.length - 1] = table[i][table.length - 1];
  }

  if (table.length % 2 > 0) {
    let midPoint = Math.floor(table.length / 2);
    rotatedTable[midPoint][midPoint] = table[midPoint][midPoint];
  }

  for (let i = Math.ceil(table.length / 2); i < table.length; i++) {
    for (let j = table.length - 1; j > 0; j--) {
      const index = i < Math.floor(table.length / 2) ? j + 1 : j - table.length;
      rotatedTable[i][-index - 1] = table[i][-index];
    }
    rotatedTable[i][table.length - 1] = table[i - 1][table.length - 1];
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
// rotate([...to2DTable(table)]).forEach((item) => console.log(item));
// console.log(flat(rotate([...to2DTable(table)])));

function rotateTable(table: UniDimensionalTable): UniDimensionalTable {
  let rotatedTable = table.map((_) => NaN);
  const sqrt = tableLengthSquareRoot(table);

  for (let j = 0; j < sqrt / 2 - 1; j++) {
    for (let i = 0; i < table.length; i++) {
      // if (i + j !== table.length - 1 && (i + j + 1) % sqrt === 0) {
      //   rotatedTable[i + j + sqrt] = table[i];
      // }

      // Moving first item of current to first item of previous
      if (i - j !== 0 && (i - j) % sqrt === 0) {
        rotatedTable[i - sqrt] = table[i];
      }

      // if (i < table.length / 2 && !((i + 1) % sqrt === 0 && i % sqrt === 0)) {
      //   rotatedTable[i + 1] = table[i];
      // }
    }
  }

  for (let i = 0; i < table.length; i++) {
    // if (i !== table.length - 1 && (i + 1) % sqrt === 0) {
    //   rotatedTable[i + sqrt] = table[i];
    // }
    // if (i !== 0 && i % sqrt === 0) {
    //   rotatedTable[i - sqrt] = table[i];
    // }
    // if (i < table.length / 2 && !((i + 1) % sqrt === 0 && i % sqrt === 0)) {
    //   rotatedTable[i + 1] = table[i];
    // }
  }

  return rotatedTable;
}

console.log(rotateTable(table));
