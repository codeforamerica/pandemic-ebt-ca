require 'rails_helper'
require 'faker'

describe MailingAddressForm do
  describe '#save' do
    it 'updates the existing household' do
      household = Household.create(is_eligible: :yes)
      form = described_class.new(household, { mailing_street: '123 Elm Street', mailing_street_2: 'Apt 2', mailing_city: 'Oakland',
                                              mailing_zip_code: '90123' })
      form.valid?
      form.save

      household.reload

      expect(household.mailing_street).to eq('123 Elm Street')
      expect(household.mailing_street_2).to eq('Apt 2')
      expect(household.mailing_city).to eq('Oakland')
      expect(household.mailing_zip_code).to eq('90123')
    end

    it 'is valid without address 2 line' do
      household = Household.create(is_eligible: :yes)
      form = described_class.new(household, { mailing_street: '123 Elm Street', mailing_city: 'Oakland',
                                              mailing_zip_code: '90123', has_mailing_address: 'yes' })
      expect(form).to be_valid
    end

    it 'is valid with address 2 line' do
      household = Household.create(is_eligible: :yes)
      form = described_class.new(household, { mailing_street: '123 Elm Street', mailing_street_2: 'Apt 2', mailing_city: 'Oakland',
                                              mailing_zip_code: '90123', has_mailing_address: 'yes' })
      expect(form).to be_valid
    end

    it 'is not valid if address 2 is too long' do
      household = Household.create(is_eligible: :yes)
      form = described_class.new(household, { mailing_street: '123 Elm Street', mailing_city: 'Oakland',
                                              mailing_zip_code: '90123', has_mailing_address: 'yes', mailing_street_2: Faker::String.random(length: 129) })
      expect(form).not_to be_valid
      expect(form.errors.first[1]).to eq('Please enter a shorter unit or apartment.')
    end
  end
end
