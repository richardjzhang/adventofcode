file = File.open('input.txt')
file_data = file.readlines.map(&:chomp).map(&:to_i)

chunk_size = 2
count = 0
previous = file_data[0..chunk_size]

file_data.each_with_index do |_, index|
  last_index = index + chunk_size
  break if last_index >= file_data.size
  slice = file_data[index..last_index]
  count += 1 if slice.sum > previous.sum
  previous = slice
end

puts count