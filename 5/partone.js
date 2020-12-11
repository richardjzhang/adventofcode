const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
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
  let maxSeatId = 0;

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
    if (seatId > maxSeatId) maxSeatId = seatId;
  });
  console.log(maxSeatId);
}

main();
