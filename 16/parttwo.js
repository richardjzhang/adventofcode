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
  return [validRanges, nearbyTickets];
}

async function main() {
  const raw = await readFile(filePath);
  const [validRanges, nearbyTickets] = processInput(raw);
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
  console.log(positions);
}

// I performed the final step manually :(. Couldn't
// seem to get the trimmed list by recursion without hitting a maximum
// call stack size

// positions = {
//   0: ['arrival location'],
//   1: ['arrival station'],
//   2: ['wagon'],
//   3: ['seat'],
//   4: ['arrival track'],
//   5: ['departure location'],
//   6: ['type'],
//   7: ['row'],
//   8: ['duration'],
//   9: ['price'],
//   10: ['arrival platform'],
//   11: ['departure station'],
//   12: ['zone'],
//   13: ['departure time'],
//   14: ['departure date'],
//   15: ['class'],
//   16: ['train'],
//   17: ['departure platform'],
//   18: ['route'],
//   19: ['departure track'],
// };

// your ticket
// 109,137,131,157,191,103,127,53,107,151,61,59,139,83,101,149,89,193,113,97
// 103 * 59 * 83 * 101 * 193 * 97

main();
