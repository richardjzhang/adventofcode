def read_file
  file = File.open('input.txt')
  file.readline.split(",").map(&:to_i)
end

def main
  data = read_file
  reset_value = 6
  new_fish_value = 8
  new_fishes = 0

  80.times do
    new_data = []
    new_fishes = 0
    
    data.each_with_index do |timer, index|
      new_timer = timer - 1
      if new_timer == -1
        new_data[index] = reset_value
        new_fishes += 1
      else
        new_data[index] = new_timer
      end
    end

    data = new_data
    new_fishes.times do
      data.push(new_fish_value)
    end
  end

  print data.size
end

main