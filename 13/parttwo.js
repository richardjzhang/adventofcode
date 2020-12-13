const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
const readFile = require('../utils').readFile;

// Processing the input into a suitable data structure
function processInput(input) {
  let [timestamp, buses] = input.split('\n');
  buses = buses
    .split(',')
    .map((bus) => (bus === 'x' ? bus : parseInt(bus, 10)));
  const busesObj = buses.reduce((acc, multiple) => {
    return { ...acc, [multiple]: buses.indexOf(multiple) };
  }, {});
  delete busesObj.x;
  return [busesObj, buses.filter((bus) => bus !== 'x')];
}

function findNumber(multiple, busId, remainder) {
  let i = 1;
  let result = i * multiple;

  // Keep multiplying the result until we get the modulus
  // to be equal to the remainder we expect. We shouldn't run
  // into an infinite loop as we expect the input given to work.
  while (result % busId !== remainder) {
    i++;
    result = i * multiple;
  }

  return result;
}

// We use Chinese Remainder Theorem in this implementation to solve
// this problem. As an example, say we have...
// x % 3 = 2 (i.e. a number x modulus 3 is equal to 2)
// x % 4 = 2
// x % 5 = 1

// Therefore we can expect the following expression to hold true
// x1 % 3 = 2, x1 % 4 = 0, x1 % 5 = 0
// x2 % 3 = 0, x2 % 4 = 2, x2 % 5 = 0
// x3 % 3 = 0, x3 % 4 = 0, x3 % 5 = 1
// x = x1 + x2 + x3

// Hence, we simply need to obtain the numbers x1, x2 and x3.
// x1 will need to be a multiple of 4 and 5, x2 a multiple of
// 3 and 5, and x3 a multiple of 3 and 4. In my naive implementation
// of CRT, I have a while loop (in the function findNumber) that
// continues to multiply x1, x2 and x3 with an increasing increment
// (starting from 1) until the appropriate remainder has been found.
// We then subtract the x that we have found by x1 * x2 * x3 (as long
// as x - x1 * x2 * x3 is still greater than 0). This is because the
// x we have may not be the earliest timestamp and x % (x1 * x2 * x3) = 0.

async function main() {
  const input = await readFile(filePath);
  const [busInfo, busOrder] = processInput(input);

  const multiples = new Array(busOrder.length).fill(1);
  for (let i = 0; i < busOrder.length; i++) {
    const busId = busOrder[i];
    for (let j = 0; j < multiples.length; j++) {
      if (i !== j) multiples[j] *= busId;
    }
  }

  for (let i = 0; i < multiples.length; i++) {
    const busId = busOrder[i];
    const multiple = multiples[i];
    let remainder = (busId - busInfo[busId]) % busId;
    if (remainder < 0) remainder = busId + remainder;
    multiples[i] = findNumber(multiple, busId, remainder);
  }

  const totalMultiplication = busOrder.reduce((acc, multiple) => acc * multiple, 1);
  const sum = multiples.reduce((acc, multiple) => acc + multiple, 0);
  let lowestMultiple = sum;
  while (lowestMultiple - totalMultiplication > 0) lowestMultiple -= totalMultiplication;
  console.log(lowestMultiple);
}

main();
