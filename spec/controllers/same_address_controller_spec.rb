require 'rails_helper'

RSpec.describe SameAddressController do
  it_behaves_like 'form controller base behavior', Household.create({ is_eligible: :yes })

  describe '.show?' do
    it 'does not show when the household has 1 child' do
      household = Household.create
      household.children.create(first_name: 'Jane')
      show_page = subject.class.show?(household)
      expect(show_page).to eq(false)
    end

    it 'shows when the household has 2 children' do
      household = Household.create
      household.children.create(first_name: 'Jane')
      household.children.create(first_name: 'John')
      show_page = subject.class.show?(household)
      expect(show_page).to eq(true)
    end
  end
end
