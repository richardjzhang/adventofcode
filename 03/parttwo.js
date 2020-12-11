const input = require('./input').input;

function traverseSlope(right, down) {
  // Total trees
  let trees = 0;

  // Position tracker
  let position = 0;

  // Objects
  const tree = '#';
  const open = '.';

  for (let row = down; row < input.length; row += down) {
    let pattern = input[row];
    position += right;

    // If the position has overshot the pattern, offset the pattern
    // length to begin again from the start of the pattern
    if (position >= pattern.length) position -= pattern.length

    // If the position indicates that it's a tree, increment total
    // tree count
    if (pattern[position] == tree) trees++;
  }
  return trees;
}

function main() {
  return traverseSlope(1, 1) * traverseSlope(3, 1) * traverseSlope(5, 1) * traverseSlope(7, 1) * traverseSlope(1, 2);
}

console.log(main());