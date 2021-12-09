def read_file
  file = File.open('input.txt')
  file.readlines.map { |x| x.chomp.chars.map { |c| c.to_i } }
end

def compare_cells cell, adj_cell
  adj_cell.nil? || cell < adj_cell
end

def adjacent_cell data, r, c
  data[r][c] if (0...data.size).include?(r) && (0...data.first.size).include?(c)
end

def is_local_minima(data, r, c, cell)
  [[0, 1], [0, -1], [1, 0], [-1, 0]].all? do |dr, dc|
    adj_cell = adjacent_cell(data, r + dr, c + dc)
    compare_cells(cell, adj_cell)
  end
end

def main
  data = read_file
  local_minimas = []

  data.each_with_index do |row, r|
    row.each_with_index do |cell, c|
      local_minimas << cell if is_local_minima(data, r, c, cell)
    end
  end
  
  print "Risk: #{local_minimas.size + local_minimas.sum}"
end

main
