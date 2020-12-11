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

// byr (Birth Year) - four digits; at least 1920 and at most 2002.
// iyr (Issue Year) - four digits; at least 2010 and at most 2020.
// eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
// hgt (Height) - a number followed by either cm or in:
// If cm, the number must be at least 150 and at most 193.
// If in, the number must be at least 59 and at most 76.
// hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
// ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
// pid (Passport ID) - a nine-digit number, including leading zeroes.
// cid (Country ID) - ignored, missing or not.

const VALID_NUMBER_OF_KEYS = 8;
const OPTIONAL_KEY = 'cid';

async function main() {
  const input = await readFile(filePath);
  const passports = processInput(input);
  let validPassports = 0;

  // Check validity of each passport
  for (let i = 0; i < passports.length; i++) {
    const passport = passports[i];
    const keys = passport.split(' ');
    // There are less than 7 keys so this can't be valid
    if (keys.length < VALID_NUMBER_OF_KEYS - 1) continue;

    // If the OPTIONAL_KEY is found within a set of 7 keys, then it
    // can't be a valid passport.
    if (
      keys.length === VALID_NUMBER_OF_KEYS - 1 &&
      keys.find((element) => element.includes(OPTIONAL_KEY)) != null
    )
      continue;

    // 7 or 8 keys are here, now we just need to check them against
    // the rules set out above

    // Check for byr
    let [byr, byrYear] = keys
      .find((element) => element.includes('byr'))
      .split(':');
    byrYear = parseInt(byrYear, 10);
    if (byrYear < 1920 || byrYear > 2002) continue;

    // Check for iyr
    let [iyr, iyrYear] = keys
      .find((element) => element.includes('iyr'))
      .split(':');
    iyrYear = parseInt(iyrYear, 10);
    if (iyrYear < 2010 || iyrYear > 2020) continue;

    // Check for eyr
    let [eyr, eyrYear] = keys
      .find((element) => element.includes('eyr'))
      .split(':');
    eyrYear = parseInt(eyrYear, 10);
    if (eyrYear < 2020 || eyrYear > 2030) continue;

    // Check for hgt
    let [hgt, hgtValue] = keys
      .find((element) => element.includes('hgt'))
      .split(':');
    const height = parseInt(hgtValue.substr(0, hgtValue.length - 2), 10);
    const unit = hgtValue.substr(hgtValue.length - 2);
    const isValid = unit === 'cm' || unit === 'in';
    if (!isValid) continue;
    if (unit === 'cm' && (height < 150 || height > 193)) continue;
    if (unit === 'in' && (height < 59 || height > 76)) continue;

    // Check for hcl
    let [hcl, hclValue] = keys
      .find((element) => element.includes('hcl'))
      .split(':');
    if (hclValue[0] !== '#') continue;
    const letters = hclValue.substr(1);
    const re = new RegExp(/^[a-z0-9]+$/);
    if (letters.length !== 6 || letters.match(re) == null) continue;

    // Check for ecl
    let [ecl, eclValue] = keys
      .find((element) => element.includes('ecl'))
      .split(':');
    if (!['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(eclValue))
      continue;

    // Check for pid
    let [pid, pidValue] = keys
      .find((element) => element.includes('pid'))
      .split(':');
    if (pidValue.length !== 9 || !Boolean(parseInt(pidValue))) continue;

    validPassports++;
  }

  console.log(validPassports);
}

main();
