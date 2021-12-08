def read_file
  file = File.open('input.txt')
  data = file.readlines
  data.map { |x| x.split(" | ").last }.map(&:chomp).map { |x| x.split(" ") }
end

def main
  unique = [2, 3, 4, 7]
  data = read_file.flatten
  filtered = data.filter { |x| unique.include? x.length }
  print filtered.size
end

main
