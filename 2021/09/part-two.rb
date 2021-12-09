def read_file
  file = File.open('input.txt')
  file.readlines.map { |x| x.chomp.chars.map { |c| c.to_i } }
end

def compare_cells cell, adj_cell
  adj_cell.nil? || cell < adj_cell
end

def adjacent_cells_diff
  [[0, 1], [0, -1], [1, 0], [-1, 0]]
end

def adjacent_cell r, c
  @data[r][c] if (0...@data.size).include?(r) && (0...@data.first.size).include?(c)
end

def is_local_minima(r, c, cell)
  adjacent_cells_diff.all? do |dr, dc|
    adj_cell = adjacent_cell(r + dr, c + dc)
    compare_cells(cell, adj_cell)
  end
end

def traverse_basins r, c, locations
  @traversed[r][c] = true
  adjacent_cells_diff.each do |dr, dc|
    adj_cell = adjacent_cell(r + dr, c + dc)
    if adj_cell && adj_cell < 9 && @traversed[r + dr][c + dc].nil?
      locations += traverse_basins r + dr, c + dc, 1
    end
  end
  locations
end

def main
  @data = read_file
  @traversed = Hash.new { |h, k| h[k] = {} }
  local_minimas = []

  @data.each_with_index do |row, r|
    row.each_with_index do |cell, c|
      local_minimas << { row: r, column: c } if is_local_minima(r, c, cell)
    end
  end
  
  basins = []
  local_minimas.each do |cell|
    basins << traverse_basins(cell[:row], cell[:column], 1)
  end

  print basins.max(3).inject(:*)
end

main
