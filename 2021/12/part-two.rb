def read_file
  file = File.open('input.txt')
  file.readlines.map { |x| x.chomp.split("-") }
end

def is_lower str
  str == str.downcase
end

def traverse_caves cave, traversed_sm_caves, has_visited_small
  return if traversed_sm_caves.include?(cave) && has_visited_small
  return @total += 1 if cave == "end"

  if is_lower(cave)
    if traversed_sm_caves.include? cave
      has_visited_small = true
    else
      traversed_sm_caves << cave
    end
  end

  @caves[cave].each { |n| traverse_caves n, traversed_sm_caves.dup, has_visited_small }
end

def main
  @data = read_file
  @caves = Hash.new { |h, k| h[k] = [] }
  @total = 0

  # Map the starting caves/caves to connecting caves/caves
  @data.each do |caves|
    start_cave, end_cave = caves
    @caves[start_cave] << end_cave if end_cave != "start"
    @caves[end_cave] << start_cave if start_cave != "start"
  end

  # Traverse the caves
  traverse_caves "start", [], false
  print @total
end

main
