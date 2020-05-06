module RandomString
  CHARS = [('a'..'z'), ('A'..'Z'), (0..9), [' ']].map(&:to_a).flatten

  def random_string_of_length(string_length)
    (0...string_length).map { CHARS[rand(CHARS.length)] }.join
  end
end
