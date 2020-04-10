require 'rails_helper'

RSpec.describe ReceivedCardController do
  it_behaves_like "form controller base behavior", Household.create({is_eligible: :yes})

  context "household is eligible" do
    it 'should show' do
      expect(subject.class.show?(Household.new({is_eligible: :yes}))).to be_truthy
    end
  end
end