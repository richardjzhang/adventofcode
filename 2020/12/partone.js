const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
const readFile = require('../utils').readFile;

// Processing the input into a suitable data structure
function processInput(input) {
  return input.split('\n');
}

let position = {
  deg: 0,
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
        switch (position.deg) {
          case 0: {
            position.x += unit;
            break;
          }
          case 90: {
            position.y += unit;
            break;
          }
          case 180: {
            position.x -= unit;
            break;
          }
          case 270: {
            position.y -= unit;
            break;
          }
        }
        continue;
      }
      case 'L': {
        position.deg += unit;
        if (position.deg >= 360) position.deg -= 360;
        if (position.deg < 0) position.deg += 360;
        continue;
      }
      case 'R': {
        position.deg -= unit;
        if (position.deg >= 360) position.deg -= 360;
        if (position.deg < 0) position.deg += 360;
        continue;
      }
      case 'N': {
        position.y += unit;
        continue;
      }
      case 'S': {
        position.y -= unit;
        continue;
      }
      case 'E': {
        position.x += unit;
        continue;
      }
      case 'W': {
        position.x -= unit;
        continue;
      }
      default:
        continue;
    }
  }

  position.x = Math.abs(position.x);
  position.y = Math.abs(position.y);
  console.log(position.x + position.y);
  console.log(position);
}

main();
