file = File.open('input.txt')
file_data = file.readlines.map(&:chomp).map(&:to_i)

count = 0
file_data.values_at(1..-1).each_with_index do |current, index|
  count += 1 if current > file_data[index]
end

puts count
