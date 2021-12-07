def read_file
  file = File.open('input.txt')
  file.readline.split(",").map(&:to_i)
end

WINDOW = 8
RESET = 6

def main(days)
  data = read_file
  fish_counts = (0..WINDOW).map { |d| data.count(d) || 0 }

  days.times do 
    fish_counts.rotate!
    fish_counts[RESET] += fish_counts.last
  end

  fish_counts.sum
end

puts main 256
