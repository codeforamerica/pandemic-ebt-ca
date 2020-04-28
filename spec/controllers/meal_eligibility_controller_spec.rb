require 'rails_helper'

RSpec.describe MealEligibilityController do
  it_behaves_like 'form controller base behavior', Household.create({ is_eligible: :yes })

  context 'household is of an unknown eligibility' do
    it 'shows' do
      expect(subject.class).to be_show(Household.new({ is_eligible: :dont_know }))
    end
  end
end
