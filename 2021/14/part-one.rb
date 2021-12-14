def read_file
  file = File.open('sample-input.txt')
  data = file.readlines.map { |x| x.chomp }
  insertions = data.filter { |e| e.include? "->" }.map { |e| e.split(" -> ") }.to_h
  template = data.reject { |e| e.include? "->" }.first
  [template, insertions]
end


def main
  template, insertions = read_file
  number_of_steps = 10

  number_of_steps.times do 
    new_template = ""
    for i in (0..template.size - 1) do
      pair = template[i..i + 1]
      new_template += "#{i == 0 ? template[i] : ""}#{insertions[pair]}#{template[i + 1]}"
    end
    template = new_template
  end

  counts = template.split("").uniq.map { |e| [e, template.count(e)] }.to_h
  print counts.values.max - counts.values.min
end

main
