def read_file
  file = File.open('sample-input.txt')
  file.readlines.map { |x| x.chomp }
end


def main
  data = read_file
end

main
