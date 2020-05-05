require 'rails_helper'

describe ResidentialAddressForm do
  describe '#save' do
    it 'updates the existing household' do
      household = Household.create(is_eligible: :yes)
      form = described_class.new(household, { residential_street: '123 Elm Street', residential_street_2: 'Apt 2', residential_city: 'Oakland',
                                              residential_zip_code: '90123', has_mailing_address: 'yes' })
      form.valid?
      form.save

      household.reload

      expect(household.residential_street).to eq('123 Elm Street')
      expect(household.residential_street_2).to eq('Apt 2')
      expect(household.residential_city).to eq('Oakland')
      expect(household.residential_zip_code).to eq('90123')
      expect(household).to have_mailing_address_yes
    end

    it 'is valid without address 2 line' do
      household = Household.create(is_eligible: :yes)
      form = described_class.new(household, { residential_street: '123 Elm Street', residential_city: 'Oakland',
                                              residential_zip_code: '90123', has_mailing_address: 'yes' })
      expect(form).to be_valid
    end

    it 'is valid with address 2 line' do
      household = Household.create(is_eligible: :yes)
      form = described_class.new(household, { residential_street: '123 Elm Street', residential_street_2: 'Apt 2', residential_city: 'Oakland',
                                              residential_zip_code: '90123', has_mailing_address: 'yes' })
      expect(form).to be_valid
    end

    it 'is not valid if address 2 is too long' do
      household = Household.create(is_eligible: :yes)
      form = described_class.new(household, { residential_street: '123 Elm Street', residential_city: 'Oakland',
                                              residential_zip_code: '90123', has_mailing_address: 'yes', residential_street_2: random_string_of_length(129) })
      expect(form).not_to be_valid
      expect(form.errors.first[1]).to eq('Please enter a shorter unit or apartment.')
    end
  end
end
