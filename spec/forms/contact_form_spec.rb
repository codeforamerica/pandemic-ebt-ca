require 'rails_helper'

describe ContactForm do
  describe '#save' do
    it 'updates the existing household' do
      household = Household.create(is_eligible: :yes)
      form = described_class.new(household, { email_address: 'test@test.com', phone_number: '555-555-5555' })
      form.valid?
      form.save

      household.reload

      expect(household.email_address).to eq('test@test.com')
      expect(household.phone_number).to eq('5555555555')
    end
  end
end
