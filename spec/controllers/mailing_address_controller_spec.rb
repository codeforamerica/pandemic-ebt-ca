require 'rails_helper'

RSpec.describe MailingAddressController do
  it_behaves_like 'form controller base behavior', Household.create({ is_eligible: :yes })

  describe '.show?' do
    it 'does not show when the household indicates they do not have a mailing address' do
      household = Household.create({ has_mailing_address: 'no' })
      show_page = subject.class.show?(household)
      expect(show_page).to eq(false)
    end

    it 'shows when the household indicates they have a mailing address' do
      household = Household.create({ has_mailing_address: 'yes' })
      show_page = subject.class.show?(household)
      expect(show_page).to eq(true)
    end
  end
end
