require 'rails_helper'

describe SignatureForm do
  describe '#save' do
    it 'updates the existing household' do
      household = Household.create(is_eligible: :yes)
      form = described_class.new(household, { signature: 'John Hancock' })
      form.valid?
      form.save

      household.reload

      expect(household.signature).to eq('John Hancock')
      expect(household.submitted_at).not_to be_nil
    end

    it 'handles null bytes by stripping them out' do
      household = Household.create(is_eligible: :yes)
      form = described_class.new(household, { signature: "John\u0000Hancock\u0000" })
      form.valid?
      form.save

      household.reload

      expect(household.signature).to eq('John Hancock')
      expect(household.submitted_at).not_to be_nil
    end
  end
end
