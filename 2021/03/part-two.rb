def read_file
  file = File.open('input.txt')
  file.readlines.map(&:chomp)
end

def float num
  num.to_f
end

def calculate_sum_at_index data, index
  data.map { |num| num.split('') }.transpose.map { |nums| nums.map(&:to_i).sum }[index].to_i
end

def calculate_rates data_set, is_most_common
  i = 0
  while data_set.size > 1 do
    new_data_set = []
    sum = calculate_sum_at_index data_set, i
    total = float data_set.size 
    filter_condition = is_most_common ? sum >= float(total / 2) : sum < float(total /2)
    new_data_set = data_set.filter { |num| num[i] == (filter_condition ? '1' : '0') }
    data_set = new_data_set
    i += 1
  end  
  data_set
end

def main
  data = read_file
  o_set = calculate_rates data, true
  c_set = calculate_rates data, false
  puts o_set.first.to_i(2) * c_set.first.to_i(2)
end

main
