const path = require('path');
const filePath = path.join(__dirname, './input.txt');
const readFile = require('../utils').readFile;

function processInput(input) {
  let seats = input.split('\n').slice(0, -1);
  return seats;
}

const ROW_INDEX = 7;

async function main() {
  const input = await readFile(filePath);
  const seats = processInput(input);

  // Track highest seat id
  let seatIds = [];

  seats.forEach((seat) => {
    // Track region
    let [f, b] = [0, 127];
    let [l, r] = [0, 7];

    // Loop through first 7 characters in seat
    // and determine row region
    for (let i = 0; i < ROW_INDEX; i++) {
      const letter = seat[i];
      if (letter === 'F') b -= Math.floor((b - f) / 2);
      else f += Math.ceil((b - f) / 2);
    }

    // Loop through remaining characters in seat
    // and determine column region
    for (let i = ROW_INDEX; i < seat.length; i++) {
      const letter = seat[i];
      if (letter === 'L') r -= Math.floor((r - l) / 2);
      else l += Math.ceil((r - l) / 2);
    }

    // f should equal b and l should equal r
    // at this point
    const seatId = f * 8 + l;
    seatIds.push(seatId);
  });

  // Sort seats and find missing seat id
  seatIds.sort((a, b) => (a > b ? 1 : -1));
  for (var i = 1; i < seatIds.length; i++) {
    if (seatIds[i] - seatIds[i - 1] !== 1) {
      console.log(seatIds[i] - 1);
    }
  }
}

// More efficient way to solve this problem
async function efficient() {
  const input = await readFile(filePath);
  let seats = input
    .split('\n')
    .slice(0, -1)
    .map((s) => s.replace(/B|R/g, 1).replace(/F|L/g, 0))
    .map((s) => parseInt(s, 2));

  // To find the missing seat in the unsorted list
  // we can get the difference between the sum of all the seats
  // and the sum of the consecutive integer from the minimum and the maximum
  // The formula of the consecutive integer from A to B is (A+B)(A-B+1)/2
  max = Math.max(...seats);
  min = Math.min(...seats);
  console.log(((max + min) * (max - min + 1)) / 2 - seats.reduce((a, b) => a + b));
}

main();
efficient();
