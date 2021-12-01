const path = require('path');
const filePath = path.join(__dirname, 'input.txt');
const readFile = require('../utils').readFile;

function processInput(input) {
  let passports = [];
  let passport = '';
  const inputArray = input.split('\n').slice(0, -1);

  for (let i = 0; i < inputArray.length; i++) {
    const batch = inputArray[i];
    if (batch === '') {
      passports.push(passport);
      passport = '';
    } else if (i === inputArray.length - 1) {
      passport = passport === '' ? batch : `${passport} ${batch}`;
      passports.push(passport);
    } else {
      passport = passport === '' ? batch : `${passport} ${batch}`;
    }
  }
  return passports;
}

const VALID_NUMBER_OF_KEYS = 8;
const OPTIONAL_KEY = 'cid';

async function main() {
  const input = await readFile(filePath);
  const passports = processInput(input);
  let validPassports = 0;

  // Check validity of each passport
  passports.forEach((passport) => {
    const keys = passport.split(' ');
    // All 8 keys are present
    if (keys.length === VALID_NUMBER_OF_KEYS) validPassports++;
    // There are 7 keys and none of them have the optional key
    else if (
      keys.length === VALID_NUMBER_OF_KEYS - 1 &&
      keys.find((element) => element.includes(OPTIONAL_KEY)) == null
    )
      validPassports++;
  });
  console.log(validPassports);
}

main();
