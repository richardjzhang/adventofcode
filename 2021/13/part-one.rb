def read_file
  file = File.open('input.txt')
  data = file.readlines.map { |x| x.chomp }
  coordinates = data.filter { |e| e.include? "," }.map { |e| e.split(",").map(&:to_i) }
  instructions = data.filter { |e| e.include? "=" }
                      .map do |e|
                        instruction = e.split(" ").last.split("=")
                        [instruction.first, instruction.last.to_i]
                      end
  [coordinates, instructions]
end

def main
  coordinates, instructions = read_file
  @dots = Hash.new { |h, k| h[k] = [] }

  coordinates.each do |coord|
    x, y = coord
    @dots[x] << y
  end

  [instructions.first].each do |instruction|
    type, val = instruction
    max_x = @dots.keys.max
    max_y = @dots.values.flatten.max
    min_val = val + 1
    track = 1

    if type == "y"
      @dots.each { |k, v| v.delete(val) }

      for y in (min_val..max_y) do
        x_dots = @dots.filter { |k, v| k if v.include? y }.keys
        x_dots.each do |x|
          @dots[x] << y - track * 2 if !@dots[x].include? y - track * 2
          @dots[x].delete(y)
          @dots.delete(x) if @dots[x].size == 0
        end
        track += 1
      end
    else
      @dots.delete(val)

      for x in (min_val..max_x) do
        y_dots = @dots[x].flatten
        y_dots.each do |y|
          @dots[x - track * 2] << y if !@dots[x - track * 2].include? y
          @dots[x].delete(y)
          @dots.delete(x) if @dots[x].size == 0
        end
        track += 1
      end
    end
  end

  print @dots.values.flatten.count
end

main
