require 'thor'
require './config/environment' # Load Rails

class Clean < Thor
  desc 'addresses', 'Cleans mailing addresses using the SmartyStreets API'
  def addresses
    cleaner = AddressCleaner.new
    uncleaned_households = Household.submitted.where(cleaned_address: false)
    count = uncleaned_households.count
    uncleaned_households.each do |hh|
      cleaner.run(hh)
    end
    puts "CLEANER COMPLETE! Ran on #{count} addresses."
  end
end
