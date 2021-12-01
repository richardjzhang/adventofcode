const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
const readFile = require('../utils').readFile;

// Processing the input into a suitable data structure
function processInput(input) {
  return input.split('\n').map((line) => {
    const [instruction, argument] = line.split(' ');
    return { instruction: instruction, value: parseInt(argument, 10) };
  });
}

function chainCheck(instructions, idx, fix) {
  let visitedIndex = {};
  let acc = 0;
  let i = 0;

  while (i < instructions.length) {
    if (visitedIndex[i] != null) return [acc, false];
    else visitedIndex[i] = 1;
    let { instruction, value } = instructions[i];
    if (i === idx) instruction = fix;

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
  return [acc, true];
}

let chain = {};

async function main() {
  const input = await readFile(filePath);
  const instructions = processInput(input);

  let i = 0;
  while (i < instructions.length) {
    if (chain[i] != null) break;
    const { instruction, value } = instructions[i];

    switch (instruction) {
      case 'nop':
        chain[i] = 'nop';
        i++;
        continue;
      case 'jmp': {
        chain[i] = 'jmp';
        i += value;
        continue;
      }
      default:
        i++;
    }
  }

  // For the list of jmp and nop leading
  // up to the bug, check every single one
  // by passing in the other code to see if
  // the instructions execute to the end
  Object.keys(chain).forEach((idx) => {
    const [acc, reachedEnd] = chainCheck(
      instructions,
      parseInt(idx, 10),
      chain[idx] === 'jmp' ? 'nop' : 'jmp',
    );
    if (reachedEnd) console.log(acc);
  });
}

main();
