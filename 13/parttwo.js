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

  while (result % busId !== remainder) {
    i++;
    result = i * multiple;
  }

  return result;
}

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
