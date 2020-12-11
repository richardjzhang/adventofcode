const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
const readFile = require('../utils').readFile;

// Processing the input into a suitable data structure
function processInput(input) {
  const arr = input.split('\n').map((row) => row.split(''));
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr[i].length; j++) {
      if (obj[i] == null) obj[i] = {};
      obj[i][j] = arr[i][j];
    }
  }

  return obj;
}

function sum(array) {
  return array.reduce((acc, curr) => acc + curr, 0);
}

function traverseLineOfSeats(seats, row, column, rowDiff, columnDiff) {
  const newRow = row + rowDiff;
  const newColumn = column + columnDiff;

  if (seats[newRow] == null) return 0;
  const seat = seats[newRow][newColumn];

  switch (seat) {
    case undefined:
      return 0;
    case 'L':
      return 0;
    case '#':
      return 1;
    default:
      return traverseLineOfSeats(seats, newRow, newColumn, rowDiff, columnDiff);
  }
}

function checkForSeat(prevSeats, row, column) {
  let west = traverseLineOfSeats(prevSeats, row, column, 0, -1),
    northWest = traverseLineOfSeats(prevSeats, row, column, -1, -1),
    north = traverseLineOfSeats(prevSeats, row, column, -1, 0),
    northEast = traverseLineOfSeats(prevSeats, row, column, -1, 1),
    east = traverseLineOfSeats(prevSeats, row, column, 0, 1),
    southEast = traverseLineOfSeats(prevSeats, row, column, 1, 1),
    south = traverseLineOfSeats(prevSeats, row, column, 1, 0),
    southWest = traverseLineOfSeats(prevSeats, row, column, 1, -1);

  const total = sum([
    west,
    northWest,
    north,
    northEast,
    east,
    southEast,
    south,
    southWest,
  ]);

  return total;
}

function traverseSeats(seats) {
  const prevSeats = JSON.parse(JSON.stringify(seats));
  let totalChanges = 0;

  for (const row of Object.keys(prevSeats)) {
    for (const column of Object.keys(prevSeats[row])) {
      const seat = prevSeats[row][column];
      switch (seat) {
        case 'L': {
          // Check if there are no occupied seats next to it
          const total = checkForSeat(
            prevSeats,
            parseInt(row, 10),
            parseInt(column, 10),
          );
          if (total === 0) {
            totalChanges++;
            seats[row][column] = '#';
          }
          continue;
        }
        case '#': {
          // Check if five or more seats in adjacent directions are occupied
          const total = checkForSeat(
            prevSeats,
            parseInt(row, 10),
            parseInt(column, 10),
          );
          if (total >= 5) {
            totalChanges++;
            seats[row][column] = 'L';
          }
          continue;
        }
        default:
          continue;
      }
    }
  }
  if (totalChanges === 0) return seats;
  return traverseSeats(seats);
}

async function main() {
  const input = await readFile(filePath);
  const seats = processInput(input);
  const finalArrangement = traverseSeats(seats);

  let totalOccoupiedSeats = 0;
  Object.keys(finalArrangement).forEach((row) => {
    Object.keys(finalArrangement[row]).forEach((column) => {
      if (finalArrangement[row][column] === '#') totalOccoupiedSeats++;
    });
  });
  console.log(totalOccoupiedSeats);
}

main();
