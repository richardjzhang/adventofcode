const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
const readFile = require('../utils').readFile;

function generateRange(validRanges, set, fieldName) {
  const [firstNumber, secondNumber] = set.split('-');
  let i = parseInt(firstNumber, 10);
  while (i <= parseInt(secondNumber)) {
    if (validRanges[i] == null) validRanges[i] = [];
    validRanges[i].push(fieldName);
    i++;
  }
}

// Processing the input into a suitable data structure
function processInput(raw) {
  const input = raw.split('\n\n').map((line) => line.split('\n'));
  let [info, yourTicket, nearbyTickets] = input;

  // Get valid ranges
  let validRanges = {};
  for (const field of info) {
    let [fieldName, range] = field.split(': ');
    let [firstSet, secondSet] = range.split(' or ');
    generateRange(validRanges, firstSet, fieldName);
    generateRange(validRanges, secondSet, fieldName);
  }

  // Get nearby tickets numbers
  nearbyTickets = nearbyTickets.slice(1).map((numbers) => numbers.split(','));

  // Get your ticket
  yourTicket = yourTicket
    .slice(1)
    .map((numbers) => numbers.split(','))[0]
    .map((number) => parseInt(number, 10));
  return [validRanges, yourTicket, nearbyTickets];
}

async function main() {
  const raw = await readFile(filePath);
  const [validRanges, yourTicket, nearbyTickets] = processInput(raw);
  let i = 0;
  while (i < nearbyTickets.length) {
    const tickets = nearbyTickets[i];
    for (let j = 0; j < tickets.length; j++) {
      const ticket = tickets[j];
      if (validRanges[ticket] == null) {
        nearbyTickets.splice(i, 1);
        i--;
        break;
      }
    }
    i++;
  }

  i = 0;
  let positions = {};
  while (i < nearbyTickets[0].length) {
    let arr = [];
    for (let j = 0; j < nearbyTickets.length; j++) {
      const ticket = nearbyTickets[j][i];
      const validFields = validRanges[ticket];
      if (j === 0) {
        validFields.forEach((field) => {
          arr.push(field);
        });
        continue;
      }
      arr = arr.filter((field) => validFields.includes(field));
    }
    positions[i] = arr;
    i++;
  }

  let removedKeys = [];
  const keys = Object.keys(positions);
  while (true) {
    let removeField;
    for (const position of keys) {
      const field = positions[position][0];
      if (positions[position].length === 1 && !removedKeys.includes(field)) {
        removeField = field;
        removedKeys.push(removeField);
        break;
      }
    }

    keys.filter((position) => {
      if (
        positions[position].length > 1 &&
        positions[position].includes(removeField)
      ) {
        const index = positions[position].indexOf(removeField);
        positions[position].splice(index, 1);
      }
    });

    const totalFields = keys.reduce(
      (acc, curr) => acc + positions[curr].length,
      0,
    );
    // Breaking condition
    if (totalFields === keys.length) break;
  }
  let result = 1;
  for (const position of keys) {
    const field = positions[position];
    if (field[0].includes('departure')) {
      result *= yourTicket[position];
    }
  }
  console.log(result);
}

main();
