def read_file
  file = File.open('input.txt')
  data = file.readlines.map { |x| x.chomp }
  insertions = data.filter { |e| e.include? "->" }.map { |e| e.split(" -> ") }.to_h
  template = data.reject { |e| e.include? "->" }.first
  [template, insertions]
end


def main
  template, insertions = read_file
  number_of_steps = 40
  pairs = Hash.new { |h, k| h[k] = 0 }
  occurences = Hash.new { |h, k| h[k] = 0 }

  for i in (0..template.size) do
    occurences[template[i]] += 1
    break if i == template.size - 1
    pair = template[i..i + 1]
    pairs[pair] += 1
  end

  number_of_steps.times do 
    old_pairs = pairs.dup
    for pair in old_pairs.keys do
      first_char, second_char = pair.split("")
      new_char = insertions[pair]
      number_of_pairs = old_pairs[pair]

      # Update occurences and pairs
      occurences[new_char] += number_of_pairs
      pairs[pair] -= number_of_pairs
      pairs["#{first_char}#{new_char}"] += number_of_pairs
      pairs["#{new_char}#{second_char}"] += number_of_pairs

      # Delete pairs if no longer needed
      pairs.delete(pair) if pairs[pair] <= 0
    end
  end

  print occurences.values.max - occurences.values.min
end

main
