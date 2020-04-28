require 'rails_helper'

RSpec.describe 'Coming Soon', type: :feature do
  describe 'Coming soon page' do
    it 'says coming soon when the environment variable is set' do
      stub_const 'ENV', ENV.to_h.merge('COMING_SOON' => '1')
      visit '/'
      expect(page).to have_text 'Coming soon'
    end
  end
end
