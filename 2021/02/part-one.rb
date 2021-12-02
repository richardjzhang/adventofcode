file = File.open('input.txt')
file_data = file.readlines.map(&:chomp)

horizontal = 0
depth = 0

file_data.each do |move|
  direction, num = move.split(" ")
  unit = num.to_i

  if direction == "forward"
    horizontal += unit
  elsif direction == "up"
    depth -= unit
  else
    depth += unit
  end
end

puts horizontal * depth
