def read_file
  file = File.open('input.txt')
  file.readline.split(",").map(&:to_i)
end

def median(array)
  return nil if array.empty?
  sorted = array.sort
  len = sorted.length
  (sorted[(len - 1) / 2] + sorted[len / 2]) / 2.0
end

def main
  data = read_file
  median = median(data)
  total = 0

  for i in data do
    total += (median - i).abs
  end

  print total
end

puts main
