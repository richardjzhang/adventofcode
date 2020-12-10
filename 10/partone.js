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

async function main() {
  const input = await readFile();
  const adapters = processInput(input).sort((a, b) => (a > b ? 1 : -1));

  let distribution = { 1: 0, 2: 0, 3: 1 };
  let prevJoltage = 0;

  for (adapter in adapters) {
    const joltage = adapters[adapter];
    const diff = joltage - prevJoltage;

    distribution[diff] += 1;
    prevJoltage = joltage;
  }
  console.log(distribution[1] * distribution[3]);
}

main();
