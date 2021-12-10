def read_file
  file = File.open('input.txt')
  file.readlines.map { |x| x.chomp.split("") }
end

def main
  data = read_file
  start_chunks = ["(", "[", "{", "<"]
  chunk_map = { ")": "(", "]": "[", "}": "{", ">": "<" }
  chunk_points = { ")": 3, "]": 57, "}": 1197, ">": 25137 }
  total_points = 0

  data.each do |line|
    start_chunk_hist = []
    line.each do |chunk|
      if start_chunks.include? chunk || start_chunk_hist.empty?
        start_chunk_hist << chunk
        next
      end

      if chunk_map[chunk.to_sym] != start_chunk_hist.last
        total_points += chunk_points[chunk.to_sym]
        break
      else
        start_chunk_hist.pop
      end
    end
  end

  print total_points
end

main
