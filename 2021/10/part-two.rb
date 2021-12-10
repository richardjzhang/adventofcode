def read_file
  file = File.open('input.txt')
  file.readlines.map { |x| x.chomp.split("") }
end

def main
  lines = read_file
  start_chunks = ["(", "[", "{", "<"]
  start_chunk_map = { "(": ")", "[": "]", "{": "}", "<": ">" }
  end_chunk_map = { ")": "(", "]": "[", "}": "{", ">": "<" }
  chunk_points = { ")": 1, "]": 2, "}": 3, ">": 4 }

  missing_end_chunks = []
  lines.each_with_index do |line, index|
    start_chunk_hist = []
    incomplete = true
    line.each_with_index do |chunk, idx|
      if start_chunks.include? chunk || start_chunk_hist.empty?
        start_chunk_hist << chunk
        next
      end

      if end_chunk_map[chunk.to_sym] != start_chunk_hist.last
        incomplete = false
        break
      end

      start_chunk_hist.pop if end_chunk_map[chunk.to_sym] == start_chunk_hist.last
    end
    missing_end_chunks << start_chunk_hist.map { |c| start_chunk_map[c.to_sym] }.reverse if incomplete
  end

  totals = []
  missing_end_chunks.each do |chunks|
    total = 0
    chunks.each { |chunk| total = 5 * total + chunk_points[chunk.to_sym] }
    totals << total
  end

  print totals.sort[totals.length / 2]
end

main
