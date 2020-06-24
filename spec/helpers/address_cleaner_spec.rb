require 'rails_helper'

RSpec.describe AddressCleaner do
  describe '#run' do
    it 'sets the cleaned_address fields' do
      cleaner = described_class.new

      expect(cleaner).to receive(:get_result).and_return(
        OpenStruct.new(
          delivery_line_1: '123 Main St',
          delivery_line_2: 'Unit B',
          components: OpenStruct.new(
            city_name: 'Minneapolis',
            zipcode: '55443'
          )
        )
      )

      hh = Household.new
      cleaner.run(hh)

      expect(hh.clean_street_1).to eq('123 Main St')
      expect(hh.clean_street_2).to eq('Unit B')
      expect(hh.clean_city).to eq('Minneapolis')
      expect(hh.clean_zip_code).to eq('55443')
      expect(hh.cleaned_address).to be_truthy
    end
  end
end
