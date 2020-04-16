require "rails_helper"

describe 'SuccessForm' do
  describe "#save" do
    it 'should update the existing household' do
      household = Household.create(is_eligible: :yes)
      form = SuccessForm.new(household, { application_experience: "good" })
      form.valid?
      form.save

      household.reload

      expect(household.good_application_experience?).to be_truthy
    end
  end
end