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

def max_x
  @dots.keys.max
end

def max_y
  @dots.values.flatten.max
end

def main
  coordinates, instructions = read_file
  @dots = Hash.new { |h, k| h[k] = [] }

  coordinates.each do |coord|
    x, y = coord
    @dots[x] << y
  end

  instructions.each do |instruction|
    type, val = instruction
    min = val + 1
    max = type == "y" ? max_y : max_x
    track = 1

    if type == "y"
      @dots.each { |_, v| v.delete(val) }
      for y in (min..max) do
        x_dots = @dots.select { |_, v| v.include? y }.keys
        x_dots.each do |x|
          @dots[x] << y - track * 2 unless @dots[x].include? y - track * 2
          @dots[x].delete(y)
        end
        track += 1
      end
    else
      @dots.delete(val)
      for x in (min..max) do
        y_dots = @dots[x].flatten
        y_dots.each do |y|
          @dots[x - track * 2] << y unless @dots[x - track * 2].include? y
        end
        track += 1
        @dots.delete(x)
      end
    end

  end

  for x in (0..max_x) do
    for y in (0..max_y) do
      if @dots[x].include? y
        print "#"
      else
        print "."
      end
    end
    print("\n")
  end
end

main
