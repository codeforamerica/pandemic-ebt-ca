require 'rails_helper'

RSpec.describe SorryController do
  it_behaves_like "form controller base behavior", Household.create({is_eligible: :yes})

  context "household is ineligible" do
    it 'should show' do
      expect(subject.class.show?(Household.new({is_eligible: :no}))).to be_truthy
    end
  end
end