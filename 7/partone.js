const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
const readFile = require('../utils').readFile;

// Processing the input into a suitable data structure
function processInput(input) {
  const bags = input.split('\n').map((bag) => {
    const bagArray = bag.split(' contain');
    const [bagName, bagContains] = bagArray;
    return [
      bagName.substr(0, bagName.length - 5),
      bagContains.trim().split(', '),
    ];
  });
  return bags;
}

let searchedBags = {};
function traverse(bags, targetBag) {
  for (let i = 0; i < bags.length; i++) {
    const [bagName, bagContains] = bags[i];
    if (
      bagContains.find((bagDesc) => bagDesc.includes(targetBag)) != null &&
      searchedBags[bagName] == null
    ) {
      searchedBags[bagName] = 1;
      traverse(bags, bagName);
    }
  }
}

async function main() {
  const input = await readFile(filePath);
  const bags = processInput(input);
  traverse(bags, 'shiny gold');
  console.log(Object.keys(searchedBags).length);
}

main();
