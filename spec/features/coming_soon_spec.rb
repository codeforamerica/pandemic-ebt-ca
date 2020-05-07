require 'rails_helper'

RSpec.describe 'Coming Soon', type: :feature do
  before do
    stub_const 'ENV', ENV.to_h.merge('COMING_SOON' => '1')
  end

  describe 'Index page' do
    it 'says coming soon when the environment variable is set' do
      visit '/'
      expect(page).to have_text 'Coming soon'
    end

    it 'does not show apply now when the environment variable is set' do
      visit '/'
      expect(page).not_to have_link 'Apply now'
    end
  end

  describe 'Info page' do
    it 'does not show apply now when the environment variable is set' do
      visit '/en/info'
      expect(page).not_to have_link 'Apply now'
    end
  end
end
