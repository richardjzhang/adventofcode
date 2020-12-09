const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'input.txt');

// Reading the file input.txt
async function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

// Processing the input into a suitable data structure
function processInput(input) {
  const bags = input.split('\n').map((bag) => {
    const bagArray = bag.split(' contain');
    const [bagName, bagContains] = bagArray;
    const bagContainsObject = bagContains
      .trim()
      .split(', ')
      .filter((b) => !b.includes('no other bags'))
      .map((b) => {
        const arr = b.split(' ').filter((val) => !val.includes('bag'));
        const count = parseInt(arr[0], 10);
        return { [arr.splice(1).join(' ')]: count };
      })
      .reduce((current, next) => {
        return { ...current, ...next };
      }, {});

    return { [bagName.substr(0, bagName.length - 5)]: bagContainsObject };
  });
  return bags.reduce((current, next) => {
    return { ...current, ...next };
  }, {});
}

function traverse(bags, targetBag) {
  const searchBags = bags[targetBag];
  let tempValue = 0;

  Object.keys(searchBags).forEach((b) => {
    tempValue += searchBags[b] + searchBags[b] * traverse(bags, b);
  });

  return tempValue;
}

async function main() {
  const input = await readFile();
  const bags = processInput(input);
  console.log(traverse(bags, 'shiny gold'));
}

main();
