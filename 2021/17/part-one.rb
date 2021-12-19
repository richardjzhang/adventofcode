def read_file
  file = File.open('input.txt')
  x_area, y_area = file.readline.split(": ").last.split(", ").map { |elem| elem.split("=").last.split("..").map(&:to_i) }
  return [x_area, y_area]
end

def main
  x_area, y_area = read_file
  print (1..y_area.min.abs - 1).to_a.sum
end

main
