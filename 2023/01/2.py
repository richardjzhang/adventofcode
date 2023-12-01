import re

def parse_number(number):
    digit_map = {
        "one": "1", "two": "2", "three": "3", "four": "4",
        "five": "5", "six": "6", "seven": "7", "eight": "8", "nine": "9"
    }

    # Find all matches including overlapping ones
    pattern = r'(?:[1-9]|one|two|three|four|five|six|seven|eight|nine)'
    matches = [(match.group(), match.start()) for match in re.finditer(pattern, number)]
    
    # Additional check for overlapping digit words
    for word in digit_map.keys():
        start = 0
        while True:
            start = number.find(word, start)
            if start == -1:
                break
            matches.append((word, start))
            start += 1

    # Remove duplicate matches and sort based on their starting positions
    matches = list(set(matches))
    matches.sort(key=lambda x: x[1])

    # Select the first and last matches
    if matches:
        first_digit = matches[0][0] if matches[0][0].isdigit() else digit_map[matches[0][0]]
        last_digit = matches[-1][0] if matches[-1][0].isdigit() else digit_map[matches[-1][0]]

        return int(first_digit + last_digit)
    else:
        return 0

# Read lines from the file and process them
with open('input.txt') as f:
    lines = f.read().splitlines()

numbers = map(parse_number, lines)
numbers_list = list(numbers)

# Sum the numbers in the list
print(numbers_list)
print(sum(numbers_list))
