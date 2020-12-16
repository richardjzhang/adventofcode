const { userInfo } = require('os');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
const readFile = require('../utils').readFile;

// Processing the input into a suitable data structure
function processInput(input) {
  return input.split(',');
}

function assignStartEndValues(memory, number, turn) {
  if (memory[number] == null) {
    memory[number] = { start: turn, end: null };
  } else if (memory[number].end != null) {
    const { end } = memory[number];
    memory[number].start = end;
    memory[number].end = turn;
  } else {
    memory[number].end = turn;
  }
}

async function main() {
  const raw = await readFile(filePath);
  const input = processInput(raw);
  let memory = {};

  let turn = 0;
  let number;
  while (turn < input.length) {
    number = input[turn];
    memory[number] = { start: turn, end: null };
    turn++;
  }

  while (turn < 2020) {
    const { start, end } = memory[number];
    // Number has only been spoken once
    if (end == null) {
      number = 0;
      assignStartEndValues(memory, number, turn);
    } else {
      number = end - start;
      assignStartEndValues(memory, number, turn);
    }
    turn++;
  }
  console.log(number);
}

main();
