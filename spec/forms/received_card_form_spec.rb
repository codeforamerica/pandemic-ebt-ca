require 'rails_helper'

describe ReceivedCardForm do
  describe '#save' do
    it 'updates the existing household' do
      household = Household.create(is_eligible: :yes)
      form = described_class.new(household, { received_card: :yes })
      form.valid?
      expect { form.save }.not_to change(Household, :count)

      household.reload

      expect(household).to be_received_card_yes
    end
  end
end
