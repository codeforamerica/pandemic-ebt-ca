require "rails_helper"

describe ReceivedCardForm do
  describe "#save" do
    it 'should update the existing household' do
      household = Household.create(is_eligible: :yes)
      form = ReceivedCardForm.new(household, {received_card: :yes})
      form.valid?
      expect { form.save }.to_not change { Household.count }

      household.reload

      expect(household.received_card_yes?).to be_truthy
    end
  end
end