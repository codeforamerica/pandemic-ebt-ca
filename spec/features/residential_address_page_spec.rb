require 'rails_helper'

RSpec.describe 'Residential address page', type: :feature do
  def start_application
    visit 'en/steps/eligible'
    choose 'Yes'
    click_on 'Continue'
  end

  describe 'deselecting homeless checkbox', :js do
    it 'allows you to continue without selecting' do
      start_application
      visit '/en/steps/children'
      expect(page).to have_text 'List all the students in your house'
      click_on 'Add a student'
      expect(page).to have_text 'Add a student.'
      fill_in 'First name', with: 'Joe'
      fill_in 'Last name', with: 'Johnson'
      select 'January', from: 'Month'
      select '2', from: 'Day'
      select '2010', from: 'Year'
      choose 'Public school'
      click_on 'Continue'
      expect(page).to have_text 'List all the students in your house'
      click_on 'Continue'
      expect(page).to have_text 'Just so you know'
      click_on 'Continue'
      expect(page).to have_text 'What address does Joe Johnson’s school have on file?'
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
