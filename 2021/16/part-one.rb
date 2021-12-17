def read_file
  file = File.open('sample-input.txt')
  file.readlines.first.split ""
end

def get_version packet
  binary_to_hexa packet[0..2]
end

def get_packet_type_id packet
  binary_to_hexa packet[3..5]
end

def get_length_type_id packet
  binary_to_hexa packet[6]
end

def binary_to_hexa binary
  binary.to_i(2)
end

def main
  data = read_file
  hexa_to_binary = {
    "0" => "0000",
    "1" => "0001",
    "2" => "0010",
    "3" => "0011",
    "4" => "0100",
    "5" => "0101",
    "6" => "0110",
    "7" => "0111",
    "8" => "1000",
    "9" => "1001",
    "A" => "1010",
    "B" => "1011",
    "C" => "1100",
    "D" => "1101",
    "E" => "1110",
    "F" => "1111"
  }
  
  packet = ""
  data.each do |char|
    packet += hexa_to_binary[char]
  end
  
  version = get_version packet
  packet_type_id = get_packet_type_id packet

  case packet_type_id
  when 4

  else
    length_type_id = get_length_type_id packet
    
  end

end

main
