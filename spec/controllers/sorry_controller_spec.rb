require 'rails_helper'

RSpec.describe SorryController do
  it_behaves_like 'form controller base behavior', Household.create({ is_eligible: :yes })

  context 'household is ineligible' do
    it 'shows' do
      expect(subject.class).to be_show(Household.new({ is_eligible: :no }))
    end
  end
end
