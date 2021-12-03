file = File.open('input.txt')
file_data = file.readlines.map(&:chomp)
sums = file_data.map { |num| num.split('') }.transpose.map { |nums| nums.map(&:to_i).sum }

total = file_data.size
gamma = ''
epsilon = ''

sums.each do |sum|
  if sum.to_i > (total.to_f / 2).to_f
    gamma << '1'
    epsilon << '0'
  else
    gamma << '0'
    epsilon << '1'
  end
end

puts gamma.to_i(2) * epsilon.to_i(2)
