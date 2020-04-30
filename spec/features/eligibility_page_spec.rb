require 'rails_helper'

RSpec.describe 'Eligibility page', type: :feature do
  describe 'Chooses no' do
    it 'shows the Sorry page' do
      visit '/steps/eligible'
      expect(page).to have_text 'Is the student able to receive free or reduced price meals'
      choose 'No'
      click_on 'Continue'
      expect(page).to have_text 'This program is only for students who can get free and reduced price school meals'
    end
  end

  describe "Chooses I don't know" do
    context 'does qualify' do
      it 'shows the meal eligibility page' do
        visit '/steps/eligible'
        expect(page).to have_text 'Is the student able to receive free or reduced price meals'
        choose "I don't know"
        click_on 'Continue'
        expect(page).to have_text 'Are any of these true for your family?'
        click_on 'Yes'
        expect(page).to have_text 'Have you received a P-EBT card?'
      end
    end

    context 'does not qualify' do
      it 'shows the meal eligibility page' do
        visit '/steps/eligible'
        expect(page).to have_text 'Is the student able to receive free or reduced price meals'
        choose "I don't know"
        click_on 'Continue'
        expect(page).to have_text 'Are any of these true for your family?'
        click_on 'No'
        expect(page).to have_text 'This program is only for students who can get free and reduced price school meals'
      end
    end
  end
end
