require 'rails_helper'

describe ContactForm do
  describe '#save' do
    it 'updates the existing household' do
      household = Household.create(is_eligible: :yes)
      form = described_class.new(household, { email_address: 'test@test.com' })
      form.valid?
      form.save

      household.reload

      expect(household.email_address).to eq('test@test.com')
    end
  end
end
