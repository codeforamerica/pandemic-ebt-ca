require 'rails_helper'

RSpec.describe SuccessForm do
  describe '#save' do
    it 'updates the existing household' do
      household = Household.create(is_eligible: :yes)
      form = described_class.new(household, { application_experience: 'good' })
      form.valid?
      form.save

      household.reload

      expect(household).to be_good_application_experience
    end
  end
end
