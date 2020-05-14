require 'rails_helper'

RSpec.describe 'Journey', type: :feature do
  before { visit '/en/steps/contact' }

  describe 'inputting invalid email' do
    it 'properly displays error messages' do
      expect(page).to have_text 'How can we contact you?'
      fill_in :form_email_address, with: 'bad-email'
      click_on 'Continue'
      expect(page).to have_text 'Please enter a valid email address'
    end
  end

  describe 'continuing with no email' do
    it 'continues without validation if nothing is entered' do
      expect(page).to have_text 'How can we contact you?'
      click_on 'Continue'
      expect(page).to have_text 'Add a parent or guardian’s signature.'
    end
  end

  describe 'inputting valid email' do
    it 'continues without validation if nothing is entered' do
      expect(page).to have_text 'How can we contact you?'
      fill_in :form_email_address, with: 'test@test.test'
      click_on 'Continue'
      expect(page).to have_text 'Add a parent or guardian’s signature.'
    end
  end
end
