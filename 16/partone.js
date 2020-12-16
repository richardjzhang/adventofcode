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
  let invalidTickets = [];
  for (let i = 0; i < nearbyTickets.length; i++) {
    const tickets = nearbyTickets[i];
    for (let j = 0; j < tickets.length; j++) {
      const ticket = tickets[j];
      if (validRanges[ticket] == null) {
        invalidTickets.push(parseInt(ticket, 10));
      }
    }
  }

  console.log(invalidTickets.reduce((acc, curr) => acc + curr, 0));
}

main();
