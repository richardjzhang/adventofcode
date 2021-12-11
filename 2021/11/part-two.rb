def read_file
  file = File.open('input.txt')
  file.readlines.map { |x| x.chomp.chars.map { |c| c.to_i } }
end

def adjacent_cells_diff
  [[0, 1], [0, -1], [1, 0], [-1, 0], [-1, -1], [1, 1], [-1, 1], [1, -1]]
end

def adjacent_cell r, c
  @data[r][c] if (0...@data.size).include?(r) && (0...@data.first.size).include?(c)
end

def adjust_adj_cells r, c, flashes
  @data[r][c] = 0
  @flashes += 1
  adjacent_cells_diff.each do |dr, dc|
    adj_cell = adjacent_cell(r + dr, c + dc)
    @data[r + dr][c + dc] += 1 if adj_cell && adj_cell > 0 && adj_cell < 10
  end
end

def traverse_cells
  @data.each_with_index do |row, r|
    row.each_with_index do |cell, c|
      adjust_adj_cells(r, c, 1) if cell == 10
    end
  end
end

def has_10
  @data.collect { |r| r.include? 10 }.reject { |v| !v }.size > 0
end

def main
  steps = 1000000
  step = 0
  @data = read_file

  steps.times do
    step += 1
    @flashes = 0
    @data = @data.map { |row| row.map { |c| c += 1 } }
    @adjusted = Hash.new { |h, k| h[k] = {} }
    traverse_cells while has_10
    break if @flashes == @data.size * @data.first.size
  end

  print step
end

main
