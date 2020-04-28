require 'rails_helper'

RSpec.describe AlreadyReceivedController do
  it_behaves_like 'form controller base behavior', Household.create({ is_eligible: :yes })

  context 'card already received' do
    it 'shows' do
      expect(subject.class).to be_show(Household.new({ received_card: :yes }))
    end
  end
end
