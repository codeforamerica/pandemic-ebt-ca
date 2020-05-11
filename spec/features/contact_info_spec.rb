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
    end

    it 'properly handles incorrect email' do
      visit '/en/steps/contact'
      expect(page).to have_text 'If there is a problem with your application, how would you like to be contacted?'
      check 'Email (recommended)'
      fill_in 'Email address', with: 'bad-email'
      click_on 'Continue'
      expect(page).to have_text 'Please enter a valid email address.'
      expect(page).not_to have_text 'Please enter a valid phone number.'
    end

    it 'properly handles incorrect phone number' do
      visit '/en/steps/contact'
      expect(page).to have_text 'If there is a problem with your application, how would you like to be contacted?'
      check 'Phone number'
      fill_in 'Phone number', with: '555'
      click_on 'Continue'
      expect(page).to have_text 'Please enter a valid phone number.'
      expect(page).not_to have_text 'Please enter a valid email address.'
    end

    it 'continues without validation if nothing is entered' do
      visit '/en/steps/contact'
      expect(page).to have_text 'If there is a problem with your application, how would you like to be contacted?'
      click_on 'Continue'
      expect(page).to have_text 'Add a parent or guardian’s signature.'
    end
  end
end
