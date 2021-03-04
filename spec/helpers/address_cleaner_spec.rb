require 'rails_helper'

RSpec.describe AddressCleaner do
  describe '#run' do
    before do
      @cleaner_result = OpenStruct.new(
        delivery_line_1: '123 Main St',
        delivery_line_2: 'Unit B',
        components: OpenStruct.new(
          city_name: 'Newport Beach',
          zipcode: '94100',
          state: 'CA'
        )
      )
    end

    it 'sets the residential_address fields' do
      cleaner = described_class.new

      allow(cleaner).to receive(:get_result).and_return(
        @cleaner_result
      )

      hh = Household.new
      cleaner.run(hh)

      expect(hh.clean_residential_street).to eq('123 Main St')
      expect(hh.clean_residential_street_2).to eq('Unit B')
      expect(hh.clean_residential_city).to eq('Newport Beach')
      expect(hh.clean_residential_zip_code).to eq('94100')
      expect(hh.cleaned_addresses).to be_truthy
    end

    it 'calls the cleaner only on mailing address if homeless' do
      cleaner = described_class.new

      allow(cleaner).to receive(:get_result).and_return(
        @cleaner_result
      )

      hh = build(:household, :with_mailing_address, registered_homeless: 'yes')
      cleaner.run(hh)
    end

    it 'sets the mailing_address fields if a mailing_street is set' do
      cleaner = described_class.new

      expect(cleaner).to receive(:get_result).and_return(
        OpenStruct.new(
          delivery_line_1: '345 Main St',
          delivery_line_2: 'Unit A',
          components: OpenStruct.new(
            city_name: 'San Francisco',
            zipcode: '94114',
            state: 'CA'
          )
        ),
        @cleaner_result
      )

      hh = build(:household, :with_mailing_address)
      cleaner.run(hh)

      expect(hh.clean_mailing_street).to eq('345 Main St')
      expect(hh.clean_mailing_street_2).to eq('Unit A')
      expect(hh.clean_mailing_city).to eq('San Francisco')
      expect(hh.clean_mailing_zip_code).to eq('94114')
      expect(hh.cleaned_addresses).to be_truthy
    end
  end
end
