require 'rails_helper'

RSpec.describe ReceivedCardController do
  it_behaves_like 'form controller base behavior', Household.create({ is_eligible: :yes })

  context 'household is eligible' do
    it 'shows' do
      expect(subject.class).to be_show(Household.new({ is_eligible: :yes }))
    end
  end
end
