require "rails_helper"

describe ResidentialAddressForm do
  describe "#save" do
    it 'should update the existing household' do
      household = Household.create(is_eligible: :yes)
      form = ResidentialAddressForm.new(household, {residential_street: "123 Elm Street", residential_city: "Oakland",
                                                    residential_zip_code: "90123", has_mailing_address: "yes"})
      form.valid?
      form.save

      household.reload

      expect(household.residential_street).to eq("123 Elm Street")
      expect(household.residential_city).to eq("Oakland")
      expect(household.residential_zip_code).to eq("90123")
      expect(household.has_mailing_address_yes?).to be_truthy
    end
  end
end