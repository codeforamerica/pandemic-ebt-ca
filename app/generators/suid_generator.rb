class SuidGenerator
    CHARACTERS = ('a'..'z').to_a.delete_if {|c| c == "o" || c == "i"}

    def self.generate
        "70CFA" + alphanumeric_string
    end

    private

    def self.alphanumeric_string
        string = DateTime.now.strftime('%Q')[2...-1]
        string.split("").each do |c|
            string[c] = CHARACTERS.shuffle.first.upcase if c == "0" || c == "1"
        end.join
    end
end
