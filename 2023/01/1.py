import re

with open('input.txt') as f:
    lines = f.read().splitlines()

def parse_number(number):
    first_digit = re.search('\d', number)
    last_digit = re.search('\d', number[::-1])

    return int(first_digit.group(0) + last_digit.group(0))

numbers = map(parse_number, lines)
numbers_list = list(numbers)

# Sum the numbers in the map
print(numbers_list)
print(sum(numbers_list))


