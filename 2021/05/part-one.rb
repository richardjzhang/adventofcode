def read_file
  file = File.open('input.txt')
  data = file.readlines.map(&:chomp).map do |line|
    point_1, point_2 = line.split(' -> ')
    x1, y1 = point_1.split ","
    x2, y2 = point_2.split ","
    [[x1.to_i, y1.to_i], [x2.to_i, y2.to_i]]
  end
  data.filter do |line|
    point_1, point_2 = line
    x1, y1 = point_1
    x2, y2 = point_2 
    (x1 == x2) || (y1 == y2)
  end
end

def main
  data = read_file
  points = {}
  total_count = 0

  data.each do |line|
    point_1, point_2 = line
    x1, y1 = point_1
    x2, y2 = point_2
    min_x = [x1, x2].min
    max_x = [x1, x2].max
    min_y = [y1, y2].min
    max_y = [y1, y2].max

    if min_y == max_y
      for i in min_x..max_x do
        points[i] = {} if points[i].nil?
        if points[i][y1].nil?
          points[i][y1] = 1
        else
          points[i][y1] += 1 
          total_count += 1 if points[i][y1] == 2
        end
      end
    else
      for i in min_y..max_y do
        points[x1] = {} if points[x1].nil?
        if points[x1][i].nil?
          points[x1][i] = 1
        else
          points[x1][i] += 1
          total_count += 1 if points[x1][i] == 2
        end
      end
    end
  end

  print total_count
end

main