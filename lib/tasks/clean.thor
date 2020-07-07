require 'thor'
require './config/environment' # Load Rails

class Clean < Thor
  desc 'addresses', 'Cleans mailing addresses using the SmartyStreets API'
  def addresses
    cleaner = AddressCleaner.new
    uncleaned_households = Household.submitted.where(cleaned_addresses: false)
    count = uncleaned_households.count
    uncleaned_households.in_batches.each_record do |hh|
      cleaner.run(hh)
    end
    puts "CLEANER COMPLETE! Ran on #{count} households."
  end
end
