const input = require('./input').input;

function main() {
  let validPasswords = 0;

  for (let i = 0; i < input.length; i++) {
    let frequency = 0;
    let [policy, letter, password] = input[i].split(' ');
    // Grab each position
    let [min, max] = policy.split('-');
    // Grab the letter
    letter = letter[0];
    // Exactly one occurence of the letter at each position
    if (
      (password[min - 1] == letter && password[max - 1] != letter) ||
      (password[min - 1] != letter && password[max - 1] == letter)
    ) {
      validPasswords++;
    }
  }
  return validPasswords;
}

console.log(main());
