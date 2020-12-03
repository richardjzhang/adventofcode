const file = require('./partone-input');

function main() {
  // Sort in ascending order
  const input = file.input.sort((a, b) => (a > b ? 1 : -1));
  let result;
  for (let i = 0; i < input.length; i++) {
    // Skip duplicate numbers
    if (input[i] === input[i + 1]) continue;
    result = searchPair(input, 2020 - input[i], i + 1);
    if (result != null) break;
  }
  return result;
}

function searchPair(input, target, left) {
  let result;
  let right = input.length - 1;
  while (left < right) {
    const sum = input[left] + input[right];
    if (sum === target) {
      result = input[left] * input[right] * (2020 - target);
      break;
    } else if (sum < target) left++;
    else right--;
  }
  return result;
}

console.log(main());
