const file = require('./input.js');

function main() {
  let validPasswords = 0;
  const input = file.input;
  for (let i = 0; i < input.length; i++) {
    let frequency = 0;
    let [policy, letter, password] = input[i].split(' ');
    // Grab minimum and maximum for letter frequency
    let [min, max] = policy.split('-');
    // Grab the letter
    letter = letter[0];

    // Find the frequency of the letter in the password
    for (let j = 0; j < password.length; j++) {
      let currentLetter = password[j];
      if (currentLetter == letter) frequency++;
    }

    // If frequency of letter is within min and max it is a valid password
    if (frequency >= min && frequency <= max) validPasswords++;
  }
  return validPasswords;
}

console.log(main());