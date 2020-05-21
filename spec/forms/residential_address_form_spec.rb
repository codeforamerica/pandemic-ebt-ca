require 'rails_helper'

describe ResidentialAddressForm do
  describe '#save' do
    context 'when registered_homeless is unset' do
      it 'updates the existing household' do
        household = Household.create(is_eligible: :yes)
        form = described_class.new(household, { residential_street: '123 Elm Street', residential_street_2: 'Apt 2', residential_city: 'Oakland',
                                                residential_zip_code: '96021', has_mailing_address: 'yes', registered_homeless: 'unfilled' })
        form.valid?
        form.save

        household.reload

        expect(household.residential_street).to eq('123 Elm Street')
        expect(household.residential_street_2).to eq('Apt 2')
        expect(household.residential_city).to eq('Oakland')
        expect(household.residential_zip_code).to eq('96021')
        expect(household).to have_mailing_address_yes
      end

      it 'is valid without address 2 line' do
        household = Household.create(is_eligible: :yes)
        form = described_class.new(household, { residential_street: '123 Elm Street', residential_city: 'Oakland',
                                                residential_zip_code: '96021', has_mailing_address: 'yes', registered_homeless: 'unfilled' })
        expect(form).to be_valid
      end

      it 'is valid with address 2 line' do
        household = Household.create(is_eligible: :yes)
        form = described_class.new(household, { residential_street: '123 Elm Street', residential_street_2: 'Apt 2', residential_city: 'Oakland',
                                                residential_zip_code: '96021', has_mailing_address: 'yes', registered_homeless: 'unfilled' })
        expect(form).to be_valid
      end

      it 'is not valid if address 2 is too long' do
        household = Household.create(is_eligible: :yes)
        form = described_class.new(household, { residential_street: '123 Elm Street', residential_city: 'Oakland',
                                                residential_zip_code: '96021', has_mailing_address: 'yes', registered_homeless: 'unfilled', residential_street_2: Faker::String.random(length: 129) })
        expect(form).not_to be_valid
        expect(form.errors.first[1]).to eq('Please enter a shorter unit or apartment.')
      end

      it 'validates zip codes' do
        household = Household.create(is_eligible: :yes)
        form = described_class.new(household, { residential_street: '123 Elm Street', residential_city: 'Oakland',
                                                residential_zip_code: 'not a zip code', has_mailing_address: 'yes', registered_homeless: 'unfilled' })

        expect(form).not_to be_valid
      end

      it 'validates that zip codes are from CA' do
        household = Household.create(is_eligible: :yes)
        form = described_class.new(household, { residential_street: '1600 Pennsylvania Avenue NW', residential_city: 'Washington D.C.',
                                                residential_zip_code: '20500', has_mailing_address: 'yes', registered_homeless: 'unfilled' })

        expect(form).not_to be_valid
      end
    end

    context 'when registered_homeless is true' do
      it 'does not require other residential address information' do
        @household = create(:household)

        form = described_class.new(@household, {
                                     registered_homeless: true, residential_street: nil, residential_city: nil, residential_zip_code: nil
                                   })
        expect(form).to be_valid
      end
    end
  end
end
