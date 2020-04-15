require "rails_helper"

describe ParentForm do
  describe "#save" do
    it 'should update the existing household' do
      household = Household.create(is_eligible: :yes)
      form = ParentForm.new(household, {parent_first_name: "Julia", parent_last_name: "Gonzalez"})
      form.valid?
      form.save

      household.reload

      expect(household.parent_first_name).to eq("Julia")
      expect(household.parent_last_name).to eq("Gonzalez")
    end
  end
end