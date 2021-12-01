const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
const readFile = require('../utils').readFile;

// Processing the input into a suitable data structure
function processInput(input) {
  let [timestamp, buses] = input.split('\n');
  buses = buses
    .split(',')
    .map((bus) => (bus === 'x' ? bus : parseInt(bus, 10)));
  const busInfo = buses.reduce((acc, multiple) => {
    return { ...acc, [multiple]: buses.indexOf(multiple) };
  }, {});
  delete busInfo.x;
  return [busInfo, buses.filter((bus) => bus !== 'x')];
}

function findNumber(multiple, busId, remainder) {
  let result;
  // Keep multiplying the result until we get the modulus
  // to be equal to the remainder we expect.
  for (let i = 0; i < busId; i++) {
    result = i * multiple;
    if (result % busId === remainder) break;
  }

  return result;
}

// We use Chinese Remainder Theorem in this implementation to solve
// this problem. As an example, say we have the following rules
// to satisfy...
// x % 3 = 2 (i.e. a number x modulo 3 is equal to 2)
// x % 4 = 2
// x % 5 = 1

// We construct an initial x that is quite naive. That is...
// x1 = 4 * 5 = 20
// x2 = 3 * 5 = 15
// x3 = 3 * 4 = 12
// x = x1 + x2 + x3

// Thus at this stage, we have...
// x % 3 = 20 % 3 = 2
// x % 4 = 15 % 4 = 3
// x % 5 = 12 % 5 = 2

// Now we need to actually find x1, x2 and x3 with the remainders 2,
// 2 and 1 respectively as specified above.

// In my naive implementation of CRT, I have a for loop (in the function
// findNumber) that continues to multiply x1, x2 and x3 with an
// increasing increment (starting from 0) until the appropriate remainder has
// been found. We then subract the x that we have found by x1 * x2 * x3 (as
// long as x - x1 * x2 * x3 is still greater than 0). This is because we
// may not have the earliest timestamp and x % (x1 * x2 * x3) = 0.

async function main() {
  const input = await readFile(filePath);
  const [busInfo, busOrder] = processInput(input);

  // Initial multiples...
  // x1 = 4 * 5
  // x2 = 3 * 5
  // x3 = 3 * 4
  // where x is not our final timestamp and the remainders haven't been
  // found
  const multiples = busOrder.map((busId) => {
    return busOrder
      .filter((bus) => busId !== bus)
      .reduce((acc, curr) => acc * curr, 1);
  });

  // The multiples with the appropriate remainders, where...
  // x % 3 = 2
  // x % 4 = 2
  // x % 5 = 1
  // Our x is not the final timestamp yet though
  const finalMultiples = multiples.map((multiple, idx) => {
    const busId = busOrder[idx];
    let remainder = (busId - busInfo[busId]) % busId;
    if (remainder < 0) remainder = busId + remainder;
    return findNumber(multiple, busId, remainder);
  });

  // This gives x1 * x2 * x3
  const totalMultiplication = busOrder.reduce(
    (acc, multiple) => acc * multiple,
    1,
  );
  // This gives x1 + x2 + x3, but it may not necessarily be the
  // lowest x can be (aka the earliest timestamp)
  const sum = finalMultiples.reduce((acc, multiple) => acc + multiple, 0);

  // Find the earliest timestamp by continuing to subtract
  // totalMultiplication as long as it is greater than 0
  let lowestMultiple = sum;
  while (lowestMultiple - totalMultiplication > 0)
    lowestMultiple -= totalMultiplication;
  console.log(lowestMultiple);
}

main();
