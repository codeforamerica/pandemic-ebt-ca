class SuidGenerator
  BLACKLISTED_LETTERS = %w[o i].freeze
  BLACKLISTED_NUMBERS = %w[0 1].freeze
  CHARACTERS = ('a'..'z').to_a.delete_if { |c| BLACKLISTED_LETTERS.any?(c) }

  def self.generate(seed = DateTime.now.strftime('%Q')[2...-1])
    '70CFA' + alphanumeric_string(seed)
  end

  class << self
    private

    def alphanumeric_string(seed)
      seed.split('').map { |c| BLACKLISTED_NUMBERS.any?(c) ? random_letter : c }.join
    end

    def random_letter
      CHARACTERS.sample.upcase
    end
  end
end
