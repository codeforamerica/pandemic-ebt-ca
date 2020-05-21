require 'rails_helper'

describe SameAddressForm do
  describe '#save' do
    it 'updates the existing household' do
      household = Household.create(is_eligible: :yes)
      form = described_class.new(household, { same_residential_address: 'not_sure' })
      form.valid?
      form.save

      household.reload

      expect(household.same_residential_address).to eq('not_sure')
    end
  end
end
