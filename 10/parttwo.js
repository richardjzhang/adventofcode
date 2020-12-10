const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

// Reading the file input.txt
async function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

// Processing the input into a suitable data structure
function processInput(input) {
  return input.split('\n').map((number) => parseInt(number, 10));
}

const memoize = {};
function traverse(partialAdapters) {
  const numberOfAdapters = partialAdapters.length;
  if (memoize[numberOfAdapters] != null) return memoize[numberOfAdapters];
  if (numberOfAdapters === 1) return 1;

  // Compare previous joltage with other joltages
  let traversalSum = 0;
  const prevJoltage = partialAdapters[0];
  for (let i = 1; i < numberOfAdapters; i++) {
    const joltage = partialAdapters[i];
    if (joltage - prevJoltage <= 3)
      traversalSum += traverse(partialAdapters.slice(i));
    else break;
  }
  memoize[numberOfAdapters] = traversalSum;
  return traversalSum;
}

async function main() {
  const input = await readFile();
  const partialAdapters = processInput(input).sort((a, b) => (a > b ? 1 : -1));
  const adapters = [
    0,
    ...partialAdapters,
    partialAdapters[partialAdapters.length - 1] + 3,
  ];
  console.log(traverse(adapters));
}

main();
