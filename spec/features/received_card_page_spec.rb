require 'rails_helper'

RSpec.feature "Journey", type: :feature do
  describe "selecting yes on received card page" do
    it "should show all done page" do
      visit "/"
      expect(page).to have_text "Get money to buy food while schools are closed."
      click_on "Apply now"
      expect(page).to have_text "Here's how it works:"
      click_on "Continue"
      expect(page).to have_text "Is your child able to receive free or reduced price meals"
      choose "Yes"
      click_on "Continue"
      expect(page).to have_text "Have you received a P-EBT card?"
      click_on "Yes"
      expect(page).to have_text "You’re all done"
    end
  end
end
