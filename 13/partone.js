const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
const readFile = require('../utils').readFile;

// Processing the input into a suitable data structure
function processInput(input) {
  let [timestamp, buses] = input.split('\n');
  buses = buses
    .split(',')
    .filter((bus) => bus !== 'x')
    .map((bus) => parseInt(bus, 10));
  return [parseInt(timestamp, 10), buses];
}

async function main() {
  const input = await readFile(filePath);
  const [timestamp, buses] = processInput(input);

  let earliestBus = buses[0];
  let waitingTime = buses[0] - timestamp % buses[0];
  for (let i = 1; i < buses.length; i++) {
    const busId = buses[i];
    const diff =  busId - timestamp % busId
    if (diff < waitingTime) {
      earliestBus = busId;
      waitingTime = diff;
    }
  }
  console.log(earliestBus * waitingTime);
}

main();
