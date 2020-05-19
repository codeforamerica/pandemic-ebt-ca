class SuidGenerator
  CHARS = %w[A B C D E F G H J K L M N P Q R S T U V W X Y Z 2 3 4 5 6 7 8 9].freeze
  PREFIX = '70CFA'.freeze

  def self.generate
    loop do
      output = PREFIX + random_string_of_length(10)
      return output unless Child.where(suid: output).any?
    end
  end

  class << self
    private

    def random_string_of_length(string_length)
      (0...string_length).map { CHARS[rand(CHARS.length)] }.join
    end
  end
end
