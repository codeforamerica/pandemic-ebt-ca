require 'rails_helper'

RSpec.describe ChildrenForm do
  describe '#save' do
    before do
      @household = Household.create
    end

    it 'is valid if children are present' do
      form = described_class.new(@household, children_added: 'false')
      expect(form).not_to be_valid

      form = described_class.new(@household, children_added: 'true')
      expect(form).to be_valid
    end
  end
end
