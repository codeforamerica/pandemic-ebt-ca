require 'rails_helper'

RSpec.describe 'Journey', type: :feature do
  describe 'selecting yes on received card page' do
    it 'shows all done page' do
      visit root_path
      expect(page).to have_text 'Get help buying food while schools are closed.'
      click_on 'Apply now'
      expect(page).to have_text "Here's how it works"
      click_on 'Continue'
      expect(page).to have_text 'Is the student able to receive free or reduced price meals'
      choose 'Yes'
      click_on 'Continue'
      expect(page).to have_text 'Have you already received a P-EBT card that has $365 for each eligible student in your house?'
      click_on 'Yes'
      expect(page).to have_text 'You’re all done'
    end
  end
end
