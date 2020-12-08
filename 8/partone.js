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
  return input.split('\n').map((line) => {
    const [instruction, argument] = line.split(' ');
    return { instruction: instruction, value: parseInt(argument, 10) };
  });
}

let acc = 0;
let visitedIndex = {};

async function main() {
  const input = await readFile();
  const instructions = processInput(input);

  let i = 0;
  while (i < instructions.length) {
    if (visitedIndex[i] != null) break;
    else visitedIndex[i] = 1;

    const { instruction, value } = instructions[i];
    switch (instruction) {
      case 'nop':
        i++;
        continue;
      case 'jmp': {
        i += value;
        continue;
      }
      default: {
        acc += value;
        i++;
      }
    }
  }
  console.log(acc);
}

main();
