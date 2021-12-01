const { reverse } = require('dns');
const { connect } = require('http2');
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
    return {
      type: 'storage',
      address: parseInt(storage.substr(0, storage.length - 1), 10),
      value: parseInt(item, 10),
    };
  });
}

function getAllAddresses(index, floatingAddress, rewrites) {
  if (!floatingAddress.includes('X')) {
    rewrites.push(convertBinaryToInt(reverseString(floatingAddress)));
    return;
  }

  for (let i = index; i < floatingAddress.length; i++) {
    const bit = floatingAddress[i];
    if (bit === 'X') {
      getAllAddresses(i + 1, replaceCharAtIndex(floatingAddress, i, '1'), rewrites);
      getAllAddresses(i + 1, replaceCharAtIndex(floatingAddress, i, '0'), rewrites);
    }
  }
}

function unmask(value, masks, addresses, address) {
  let floatingAddress = convertIntToBinary(address);
  const zeroes = new Array(36 - floatingAddress.length).fill(0);
  floatingAddress = reverseString(`${zeroes.join('')}${floatingAddress}`);
  for (let i = 0; i < floatingAddress.length; i++) {
    const mask = masks[i];
    if (mask !== 0)
      floatingAddress = replaceCharAtIndex(floatingAddress, i, mask);
  }
  let rewrites = [];
  getAllAddresses(0, floatingAddress, rewrites);
  for (let i = 0; i < rewrites.length; i++) {
    const rewriteAddress = rewrites[i];
    addresses[rewriteAddress] = value;
  }
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
          masks[j] = memory === 'X' ? 'X' : parseInt(memory, 10);
        }
        continue;
      }
      default: {
        const { address } = processedInput[i];
        unmask(value, masks, addresses, address);
      }
    }
  }

  console.log(
    Object.keys(addresses).reduce((acc, curr) => acc + addresses[curr], 0),
  );
}

main();
