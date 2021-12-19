def read_file
  file = File.open('input.txt')
  file.readline.chars.map{|c| c.hex.to_s(2).rjust(4, "0").chars}.flatten
end

def process_packet packet
  version = packet.shift(3).join.to_i(2)
  packet_type_id = packet.shift(3).join.to_i(2)
  @version_total += version

  case packet_type_id
  when 4
    while packet.shift == "1"
      packet.shift(4)
    end
    packet.shift(4)
  else
    if packet.shift == "0"
      len = packet.shift(15).join.to_i(2)
      sub_packet = packet.shift(len)
      until sub_packet.empty?
        process_packet(sub_packet)
      end
    else
      count = packet.shift(11).join.to_i(2)
      count.times do
        process_packet(packet)
      end
    end
  end
end

def main
  @version_total = 0
  packet = read_file
  process_packet packet
  puts @version_total
end

main
