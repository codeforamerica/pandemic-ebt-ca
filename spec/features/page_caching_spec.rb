require 'rails_helper'

RSpec.describe 'Page caching', type: :feature do
  describe 'getting some pages' do
    it 'actually caches that stuffffffs' do
      # Let's go look at pages:
      visit '/'
      visit '/info'
      visit '/how'

      # Now let's see if it cached those pages:
      expect(File).to exist(Rails.root.join('public', 'index.html'))
      expect(File).to exist(Rails.root.join('public', 'info.html'))
      expect(File).to exist(Rails.root.join('public', 'how.html'))

      # HOOOOOOOOOORAAAAAAAAAAAAAAAY page caching works!!!
    end
  end
end
