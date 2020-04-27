require 'rails_helper'

RSpec.feature "Coming Soon", type: :feature do
  describe "Coming soon page" do
    it "should say coming soon when the environment variable is set" do
      stub_const "ENV", ENV.to_h.merge("COMING_SOON" => "1")
      visit "/"
      expect(page).to have_text "Applications will open soon"
    end
  end
end
