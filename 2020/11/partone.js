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

function checkForSeat(seat, prevSeats, row, column) {
  let west = 0,
    northWest = 0,
    north = 0,
    northEast = 0,
    east = 0,
    southEast = 0,
    south = 0,
    southWest = 0;
  if (prevSeats[row - 1] != null) {
    northWest = prevSeats[row - 1][column - 1] === seat ? 1 : 0;
    north = prevSeats[row - 1][column] === seat ? 1 : 0;
    northEast = prevSeats[row - 1][column + 1] === seat ? 1 : 0;
  }
  if (prevSeats[row + 1] != null) {
    southEast = prevSeats[row + 1][column + 1] === seat ? 1 : 0;
    south = prevSeats[row + 1][column] === seat ? 1 : 0;
    southWest = prevSeats[row + 1][column - 1] === seat ? 1 : 0;
  }
  west = prevSeats[row][column - 1] === seat ? 1 : 0;
  east = prevSeats[row][column + 1] === seat ? 1 : 0;

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

function traverse(seats) {
  const prevSeats = JSON.parse(JSON.stringify(seats));
  let totalChanges = 0;

  for (const row of Object.keys(prevSeats)) {
    for (const column of Object.keys(prevSeats[row])) {
      const seat = prevSeats[row][column];
      switch (seat) {
        case 'L': {
          // Check if there are no occupied seats next to it
          const total = checkForSeat(
            '#',
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
          // Check if four or more seats adjacent to it are occupied
          const total = checkForSeat(
            '#',
            prevSeats,
            parseInt(row, 10),
            parseInt(column, 10),
          );
          if (total >= 4) {
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
  return traverse(seats);
}

async function main() {
  const input = await readFile(filePath);
  const seats = processInput(input);
  const finalArrangement = traverse(seats);

  let totalOccoupiedSeats = 0;
  Object.keys(finalArrangement).forEach(row => {
    Object.keys(finalArrangement[row]).forEach(column => {
      if (finalArrangement[row][column] === '#') totalOccoupiedSeats++;
    })
  })
  console.log(totalOccoupiedSeats);
}

main();
