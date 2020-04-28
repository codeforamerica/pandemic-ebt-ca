require 'rails_helper'

RSpec.feature "Deleting a child", type: :feature do
  describe "Deleting a child" do
    it "should delete the child from the household" do
      visit "/"
      expect(page).to have_text "Get help to buy food while schools are closed."
      click_on "Apply now"
      expect(page).to have_text "Here's how it works:"
      click_on "Continue"
      expect(page).to have_text "Is your child able to receive free or reduced price meals"
      choose "Yes"
      click_on "Continue"
      expect(page).to have_text "Have you received a P-EBT card?"
      click_on "No"
      expect(page).to have_text "Tell us about your child"
      fill_in "First name", with: "Jane"
      fill_in "Last name", with: "Johnson"
      select "January", from: "Month"
      select "2", from: "Day"
      select "2010", from: "Year"
      click_on "Add another child"
      expect(page).to have_text "Jane Johnson"
      click_on "(remove)"
      expect(page).to have_text "Child has been removed"
    end
  end
end
