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
  return input.split('\n').map(number => parseInt(number, 10));
}

function checkSum(input, target) {
  let memory = {};
  let result;
  for (let i = 0; i < input.length; i++) {
    const number = input[i];
    if (memory[number] == null) {
      memory[number] = number;
    }

    let diff = target - number;
    if (memory[diff] != null) {
      return true;
    }
  }
  return false;
}

const previousNumber = 25;
async function main() {
  const input = await readFile();
  const results = processInput(input);

  // Find invalid number
  let invalidNumber;
  for (let i = previousNumber; i < results.length; i++) {
    const previous = results.slice(i - previousNumber, i);
    const isValid = checkSum(previous, results[i]);
    if (!isValid) {
      invalidNumber = results[i];
      break;
    }
  }

  // Find contiguous set of at least two numbers that add to equal
  // the invalid number
  let left = 0;
  let right = 1;
  let partial = [results[left], results[right]];
  while (right < results.length) {
    const sum = partial.reduce((acc, curr) => acc + curr, 0);

    if (sum < invalidNumber) {
      right++;
      partial = [...partial, results[right]];
      continue;
    } else if (invalidNumber === sum) {
      break;
    } else {
      partial.shift();
    }
  }

  const min = Math.min(...partial);
  const max = Math.max(...partial);
  console.log(min + max);
}

main();
