def read_file
  file = File.open('input.txt')
  data = file.readlines
  numbers = data.map(&:chomp)[0].split(',')
  boards = data[1..-1]
            .map { |board| board.split(/[\n ,]+/).reject(&:empty?) }
            .reject(&:empty?)
            .each_slice(5)
            .to_a
  return numbers, boards
end


def generate_bingo_hash boards
  bingo_hash = {}
  for i in 0..boards.size do
    bingo_hash[i] = { rows: {}, columns: {} }
    for j in 0..4 do
      bingo_hash[i][:rows][j] = []
      bingo_hash[i][:columns][j] = []
    end
  end
  bingo_hash
end

def main
  numbers, boards = read_file
  bingo_hash = generate_bingo_hash boards
  number_of_winning_boards = {}
  winning_board_number = nil
  last_number = nil

  numbers.each do |number|
    boards.each_with_index do |board, board_number|
      board.each_with_index do |row, row_number|
        if row.include? number
          column_number = row.find_index(number)
          bingo_hash[board_number][:rows][row_number] << number
          bingo_hash[board_number][:columns][column_number] << number
          
          if (bingo_hash[board_number][:rows][row_number].size == 5 || bingo_hash[board_number][:columns][column_number].size == 5)
            number_of_winning_boards[board_number] = 1
            if number_of_winning_boards.size == boards.size
              winning_board_number = board_number
              last_number = number
              break
            end
          end
        end
        break if winning_board_number
      end
      break if winning_board_number
    end
    break if winning_board_number
  end

  total = boards[winning_board_number].flatten.map(&:to_i).sum
  offset = bingo_hash[winning_board_number][:rows].values.flatten.map(&:to_i).sum
  print (total - offset) * last_number.to_i
end

main
