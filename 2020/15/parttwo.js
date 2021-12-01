const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
const readFile = require('../utils').readFile;

// Processing the input into a suitable data structure
function processInput(input) {
  return input.split(',');
}

function assignStartEndValues(memory, number, turn) {
  let values = memory.get(number);
  if (values == null) {
    values = { start: turn, end: null };
  } else if (values.end != null) {
    const { end } = values;
    values.start = end;
    values.end = turn;
  } else {
    values.end = turn;
  }
  memory.set(number, values);
}

async function main() {
  const raw = await readFile(filePath);
  const input = processInput(raw);
  let memory = new Map();

  let turn = 0;
  let number;
  while (turn < input.length) {
    number = parseInt(input[turn], 10);
    memory.set(number, { start: turn, end: null });
    turn++;
  }

  while (turn < 30000000) {
    const { start, end } = memory.get(number);
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
