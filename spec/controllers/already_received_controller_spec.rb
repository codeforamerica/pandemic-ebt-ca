require 'rails_helper'

RSpec.describe AlreadyReceivedController do
  it_behaves_like "form controller base behavior", Household.create({is_eligible: :yes})

  context "card already received" do
    it 'should show' do
      expect(subject.class.show?(Household.new({received_card: :yes}))).to be_truthy
    end
  end
end