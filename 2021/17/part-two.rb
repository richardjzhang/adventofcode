def read_file
  file = File.open('input.txt')
  x_area, y_area = file.readline.split(": ").last.split(", ").map { |elem| elem.split("=").last.split("..").map(&:to_i) }
  return [x_area, y_area]
end

def check_positions x_vel, y_vel
  x, y = [0, 0]
  while x <= @x_area.max && y >= @y_area.min do
    x += x_vel
    y += y_vel
    x_vel -= 1 if (x_vel > 0)
    y_vel -= 1
    return true if x >= @x_area.min && x <= @x_area.max && y >= @y_area.min && y <= @y_area.max
  end
end

def main
  @x_area, @y_area = read_file
  min_x_vel = 0
  max_x_vel = @x_area.max
  min_y_vel = @y_area.min
  max_y_vel = @y_area.min.abs - 1

  count = 0
  for x_vel in min_x_vel..max_x_vel do
    for y_vel in min_y_vel..max_y_vel do
      count += 1 if check_positions x_vel, y_vel
    end
  end

  print count
end

main
