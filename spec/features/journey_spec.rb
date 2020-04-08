require 'rails_helper'

RSpec.feature "Journey", type: :feature do
  describe "Full journey" do
    it "should run the full journey" do
      visit "/"
      expect(page).to have_text "Get money to buy healthy food while schools are closed."
      click_on "Sign up now"
      expect(page).to have_text "Here's how it works:"
      click_on "Continue"
      expect(page).to have_text "Is your child able to receive free or reduced price meals"
      choose "Yes"
      click_on "Continue"
    end
  end
end
