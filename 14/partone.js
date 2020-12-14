const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
const readFile = require('../utils').readFile;

function reverseString(text) {
  return text.split('').reverse().join('');
}

function convertIntToBinary(integer) {
  return (integer >>> 0).toString(2);
}

function convertBinaryToInt(binary) {
  return parseInt(binary, 2);
}

function replaceCharAtIndex(text, index, char) {
  const chars = text.split('');
  chars[index] = char;
  return chars.join('');
}

// Processing the input into a suitable data structure
function processInput(input) {
  return input.split('\n').map((elem) => {
    const [instruction, item] = elem.split(' = ');
    if (instruction === 'mask')
      return { type: instruction, value: reverseString(item) };
    const storage = instruction.substr(4);
    const value = convertIntToBinary(parseInt(item, 10));
    const zeroes = new Array(36 - value.length).fill(0);
    return {
      type: 'storage',
      address: parseInt(storage.substr(0, storage.length - 1), 10),
      value: `${zeroes.join('')}${value}`,
    };
  });
}

function unmask(value, masks) {
  let binaryValue = reverseString(value);
  for (let i = 0; i < binaryValue.length; i++) {
    if (masks[i] != null)
      binaryValue = replaceCharAtIndex(binaryValue, i, masks[i]);
  }
  return convertBinaryToInt(reverseString(binaryValue));
}

async function main() {
  const input = await readFile(filePath);
  const processedInput = processInput(input);
  let addresses = {};
  let masks = {};

  for (let i = 0; i < processedInput.length; i++) {
    const { type, value } = processedInput[i];
    switch (type) {
      case 'mask': {
        masks = {};
        for (let j = 0; j < value.length; j++) {
          const memory = value[j];
          if (memory === 'X') continue;
          masks[j] = parseInt(memory, 10);
        }
        continue;
      }
      default: {
        const { address } = processedInput[i];
        addresses[address] = unmask(value, masks);
      }
    }
  }

  console.log(
    Object.keys(addresses).reduce((acc, curr) => acc + addresses[curr], 0),
  );
}

main();
