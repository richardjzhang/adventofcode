def read_file
  file = File.open('input.txt')
  file.readlines.map { |x| x.chomp.split("-") }
end

def is_lower str
  str == str.downcase
end

def traverse_caves cave, traversed_sm_caves
  return if traversed_sm_caves.include? cave
  return @total += 1 if cave == "end"
  traversed_sm_caves << cave if is_lower(cave)
  @caves[cave].each { |n| traverse_caves n, traversed_sm_caves.dup }
end

def main
  @data = read_file
  @caves = Hash.new { |h, k| h[k] = [] }
  @total = 0

  # Map the starting caves/caves to connecting caves/caves
  @data.each do |caves|
    start_cave, end_cave = caves
    @caves[start_cave] << end_cave
    @caves[end_cave] << start_cave
  end

  # Traverse the caves
  traverse_caves "start", []
  print @total
end

main
