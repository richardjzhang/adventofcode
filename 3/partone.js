const input = require('./input').input;

function main(right) {
  // Total trees
  let trees = 0;

  // Position tracker
  let position = 0;

  // Objects
  const tree = '#';
  const open = '.';

  for (let row = 1; row < input.length; row++) {
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

console.log(main(3));