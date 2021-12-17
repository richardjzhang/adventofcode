require 'pqueue'
require 'set'

def read_file
  file = File.open('input.txt')
  file.readlines.map { |x| x.chomp.chars.map { |c| c.to_i } }
end

def adjacent_cell grid, x, y
  grid[y][x] if (0...grid.size).include?(y) && (0...grid.first.size).include?(x)
end

def main
  grid = read_file
  target = [grid.first.size - 1, grid.size - 1]
  visited = Set[]
  
  start = [0, 0]
  initial = [start, 0]
  queue = PQueue.new([[start, 0]]) { |a, b| a.last < b.last }

  until queue.empty?
    position, risk = queue.pop
    x, y = position
    next unless visited.add?(position)
    return risk if position == target

    [[0, 1], [0, -1], [1, 0], [-1, 0]].each do |dx, dy|
      adj = adjacent_cell grid, x + dx, y + dy
      queue.push([[x + dx, y + dy], risk + adj]) if adj
    end
  end
end

puts main
