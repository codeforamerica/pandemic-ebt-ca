require 'rails_helper'

RSpec.describe 'Journey', type: :feature do
  describe 'inputting invalid phone number or email' do
    it 'properly displays error messages' do
      visit '/en/steps/contact'
      expect(page).to have_text 'If there is a problem with your application, how would you like to be contacted?'
      check 'Email (recommended)'
      check 'Phone number'
      fill_in 'Email address', with: 'bad-email'
      fill_in 'Phone number', with: '555'
      click_on 'Continue'
      expect(page).to have_text 'Please enter a valid email address'
      expect(page).to have_text 'Please enter a valid phone number.'
      # expect valid phone number and no email to go to next page
      # expect a valid email and no phone number to go to next page
      # expect invalid phone number to throw error
      # expect invalid email to throw error
    end
  end
end
