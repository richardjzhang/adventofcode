def read_file
  file = File.open('input.txt')
  file.readlines.map { |elem| parse_snail_num elem.chomp}
end

def explode(arr, ind)
  first, second = arr.slice(ind, 2)
  arr[ind - 1][:value] += first[:value] if ind != 0
  arr[ind + 2][:value] += second[:value] if arr[ind + 2]
  arr.delete_at(ind)
  arr[ind] = { value: 0, depth: first[:depth] - 1 }
end

def split(arr, ind)
  arr.insert(ind + 1, { value: (arr[ind][:value] / 2.0).ceil, depth: arr[ind][:depth] + 1 })
  arr[ind] = { value: (arr[ind][:value] / 2.0).floor, depth: arr[ind][:depth] + 1 }
end

def magnitude(arr)
  loop do
    max_depth = arr.map { |elem| elem[:depth] }.max
    break if max_depth == 0
    ind = arr.find_index { |elem| elem[:depth] == max_depth}
    arr[ind] = { value: 3 * arr[ind][:value] + 2 * arr[ind + 1][:value], depth: arr[ind][:depth] - 1 }
    arr.delete_at(ind + 1)
  end
  arr.first[:value]
end

def reduce arr
  loop do 
    index_to_explode = arr.find_index { |elem| elem[:depth] >= 5 }
    explode(arr, index_to_explode) and next if index_to_explode
    index_to_split = arr.find_index { |elem| elem[:value] >= 10 }
    split(arr, index_to_split) and next if index_to_split
    break
  end
  arr
end

def parse_snail_num num
  depth = 0
  arr = []
  num.chars.each do |char|
    if char.match?(/\d/)
      arr << { value: char.to_i, depth: depth }
    elsif char == "["
      depth += 1
    elsif char == "]"
      depth -= 1
    end
  end
  arr
end

def main
  data = read_file

  curr_num = data.first
  for num in data[1..-1] do
    new_arr = curr_num.dup.concat(num).map { |elem| { value: elem[:value], depth: elem[:depth] + 1 } } 
    curr_num = reduce new_arr
  end
  
  puts magnitude(curr_num)
end

main
