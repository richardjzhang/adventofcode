def read_file
  file = File.open('input.txt')
  file.readline.chars.map{|c| c.hex.to_s(2).rjust(4, "0").chars}.flatten
end

def process_packet packet
  version = packet.shift(3).join.to_i(2)
  packet_type_id = packet.shift(3).join.to_i(2)

  case packet_type_id
  when 4
    num = []
    num += [*packet.shift(4)] while packet.shift == "1"
    num += [*packet.shift(4)]
    return [num.join.to_i(2), packet]
  else
    result = []
    if packet.shift == "0"
      len = packet.shift(15).join.to_i(2)
      sub_packet = packet.shift(len)
      until sub_packet.empty?
        sub_result, sub_packet = process_packet(sub_packet)
        result << sub_result
      end
    else
      count = packet.shift(11).join.to_i(2)
      count.times do
        sub_result, packet = process_packet(packet)
        result << sub_result
      end
    end

    case packet_type_id
    when 0; return [result.sum, packet]
    when 1; return [result.reduce(&:*), packet]
    when 2; return [result.min, packet]
    when 3; return [result.max, packet]
    when 5; return [result.reduce(&:>) ? 1 : 0, packet]
    when 6; return [result.reduce(&:<) ? 1 : 0, packet]
    when 7; return [result.reduce(&:==) ? 1 : 0, packet]
    end
  end
end

def main
  packet = read_file
  print process_packet(packet).first
end

main
