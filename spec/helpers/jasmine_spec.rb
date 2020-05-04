require 'rails_helper'

RSpec.describe 'Javascript unit tests', type: :feature do
  describe 'run specs', js: true do
    it 'passes' do
      visit '/specs'

      result = page.find('.jasmine-overall-result')
      if result.text.include?('0 failures')
        expect(page).to have_selector('.jasmine-passed')
      else
        puts 'Jasmine tests failed:'
        raise page.find('.jasmine-failures').text
      end
    end
  end
end
