const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
const readFile = require('../utils').readFile;

// Processing the input into a suitable data structure
function processInput(input) {
  return input.split('\n');
}

let waypoint = {
  x: 10,
  y: 1,
};

let ship = {
  x: 0,
  y: 0,
};

async function main() {
  const input = await readFile(filePath);
  const processed = processInput(input);

  for (let i = 0; i < processed.length; i++) {
    const instruction = processed[i];
    const type = instruction[0];
    const unit = parseInt(instruction.substr(1), 10);
    switch (type) {
      case 'F': {
        ship.x += waypoint.x * unit;
        ship.y += waypoint.y * unit;
        continue;
      }
      case 'L': {
        const radians = (unit * Math.PI) / 180;
        const cos = Math.round(Math.cos(radians));
        const sin = Math.round(Math.sin(radians));
        const { x, y } = waypoint;
        waypoint.x = x * cos - y * sin;
        waypoint.y = x * sin + y * cos;
        continue;
      }
      case 'R': {
        const radians = (-unit * Math.PI) / 180;
        const cos = Math.round(Math.cos(radians));
        const sin = Math.round(Math.sin(radians));
        const { x, y } = waypoint;
        waypoint.x = x * cos - y * sin;
        waypoint.y = x * sin + y * cos;
        continue;
      }
      case 'N': {
        waypoint.y += unit;
        continue;
      }
      case 'S': {
        waypoint.y -= unit;
        continue;
      }
      case 'E': {
        waypoint.x += unit;
        continue;
      }
      case 'W': {
        waypoint.x -= unit;
        continue;
      }
      default:
        continue;
    }
  }

  ship.x = Math.abs(ship.x);
  ship.y = Math.abs(ship.y);
  console.log(ship);
  console.log(ship.x + ship.y);
}

main();
