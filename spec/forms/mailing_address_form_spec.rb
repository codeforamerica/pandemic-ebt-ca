require "rails_helper"

describe MailingAddressForm do
  describe "#save" do
    it 'should update the existing household' do
      household = Household.create(is_eligible: :yes)
      form = MailingAddressForm.new(household, { mailing_street: "123 Elm Street", mailing_city: "Oakland",
                                                 mailing_zip_code: "90123" })
      form.valid?
      form.save

      household.reload

      expect(household.mailing_street).to eq("123 Elm Street")
      expect(household.mailing_city).to eq("Oakland")
      expect(household.mailing_zip_code).to eq("90123")
    end
  end
end