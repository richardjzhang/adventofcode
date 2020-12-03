const input = require('./input').input;

function main(target) {
  let memory = {};
  let result;
  for (let i = 0; i < input.length; i++) {
    const number = input[i];
    if (memory[number] == null) {
      memory[number] = number;
    }

    let diff = target - number;
    if (memory[diff] != null) {
      result = diff * number;
      break;
    }
  }
  return result;
}

console.log(main(2020));