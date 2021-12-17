require 'pqueue'
require 'set'

def read_file
  file = File.open('input.txt')
  file.readlines.map { |x| x.chomp.chars.map { |c| c.to_i } }
end

def adjacent_cell grid, x, y
  grid[y][x] if (0...grid.size).include?(y) && (0...grid.first.size).include?(x)
end

def generate_grid data
  5.times.flat_map { |ny|
    data.map { |row|
      5.times.flat_map { |nx|
        row.map { |risk|
          new_risk = risk + ny + nx
          new_risk -= 9 while new_risk > 9
          new_risk
        }
      }
    }
  }
end

def main
  data = read_file
  start = [0, 0]
  grid = generate_grid data
  target = [grid[0].size - 1, grid.size - 1]
 
  visited = Set[]
  initial = [start, 0]
  queue = PQueue.new([initial]) { |a, b| a.last < b.last }

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

p main