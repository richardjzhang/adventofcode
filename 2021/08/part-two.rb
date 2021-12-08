def read_file
  file = File.open('input.txt')
  data = file.readlines
  all_outputs = data.map { |x| x.split(" | ").last }.map(&:chomp).map { |x| x.split(" ") }.map { |x| x.flatten }
  all_signals = data.map { |x| x.split(" | ").first }.map(&:chomp).map { |x| x.split(" ") }
  [all_signals, all_outputs]
end

LARGEST_SIGNAL_NUMBER = 8
UNIQUE_SIGNAL_DIGITS = [1, 7, 4, 8]
UNIQUE_SIGNAL_LENGTHS = [2, 3, 4, 7]

def calculate_character_offsets signals, size
  filtered_signals = signals.filter { |x| x.length == size }
  offsets = []

  filtered_signals.each_with_index do |signal, index| 
    offsets[index] = @digits_to_signals[LARGEST_SIGNAL_NUMBER] - signal.split("")
  end

  [filtered_signals, offsets]
end

def match_signals_to_digits signals:, offsets:, digits:, keys: [1, 4]
  digits.each_with_index do |digit, index|
    key = keys[index]
    unique_signal = @digits_to_signals[key]
    
    case digit
    when 3
      off_idx = signals.find_index { |chars| !unique_signal.difference(chars.split("")).any? }
      @digits_to_signals.store(digit, signals[off_idx].split(""))
    when 2
      off_idx = offsets.find_index { |chars| unique_signal.difference(chars).size == unique_signal.size - 2 }
      @digits_to_signals.store(digit, signals[off_idx].split(""))
    when 6, 0
      off_idx = offsets.flatten.find_index { |char| unique_signal.include? char }
      @digits_to_signals.store(digit, signals[off_idx].split(""))
    when 5, 9
      @digits_to_signals.store(digit, signals.find { |x| x.length == (digit == 5 ? 5 : 6) }.split(""))
      break
    end

    signals.delete_at(off_idx)
    offsets.delete_at(off_idx)
  end
end

def main
  sum = 0
  all_signals, all_outputs = read_file
  all_signals.each_with_index do |signals, index|
    @digits_to_signals = {}

    # Get unique signals
    unique_digits = UNIQUE_SIGNAL_LENGTHS.map { |x| signals.find { |chars| chars.length == x } }
    UNIQUE_SIGNAL_DIGITS.each_with_index do |digit, index|
      @digits_to_signals[digit] = unique_digits[index].split("")
    end

    # Figure out offsets with characters of size 5 and 6
    signals_5, offsets_5 = calculate_character_offsets signals, 5
    signals_6, offsets_6 = calculate_character_offsets signals, 6

    # Match signals to digits
    match_signals_to_digits signals: signals_5, offsets: offsets_5, digits: [3, 2, 5]
    match_signals_to_digits signals: signals_6, offsets: offsets_6, digits: [6, 0, 9]

    sum += all_outputs[index].map { |chars|
      chars_array = chars.split("")
      @digits_to_signals.find { |k, v| v.size == chars_array.size && !v.difference(chars_array).any? }.first
    }.join("").to_i
  end

  sum
end

print main
