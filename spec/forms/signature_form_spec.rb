require "rails_helper"

describe SignatureForm do
  describe "#save" do
    it 'should update the existing household' do
      household = Household.create(is_eligible: :yes)
      form = SignatureForm.new(household, { signature: "John Hancock" })
      form.valid?
      form.save

      household.reload

      expect(household.signature).to eq("John Hancock")
      expect(household.submitted_at).to_not be_nil
    end
  end
end