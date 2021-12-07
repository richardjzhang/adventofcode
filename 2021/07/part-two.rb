def read_file
  file = File.open('input.txt')
  file.readline.split(",").map(&:to_i)
end

def average(array)
  (array.sum.to_f / array.size.to_f).floor
end

def main
  data = read_file
  avg = average(data)
  total = 0

  for i in data do
    steps = (avg - i).abs
    total += (1..steps).to_a.sum
  end

  puts total
end

puts main