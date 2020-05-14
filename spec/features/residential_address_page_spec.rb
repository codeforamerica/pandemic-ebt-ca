require 'rails_helper'

RSpec.describe 'Residential address page', type: :feature do
  describe 'deselecting homeless checkbox', :js do
    it 'allows you to continue without selecting' do
      visit '/en/steps/residential-address'
      expect(page).to have_text 'What address are you registered at the school with?'
      check 'Student was homeless at time of registration'
      expect(page).not_to have_text('What is the street address?')
      expect(page).not_to have_text('What is the unit or apartment (optional)?')
      expect(page).not_to have_text('What is the city?')
      expect(page).not_to have_text('What is the ZIP code?')
      expect(page).not_to have_text('Is this the best place for you to get mail for the next two weeks?')
      click_on 'Continue'
      expect(page).to have_text('How can we contact you?')
    end
  end
end
