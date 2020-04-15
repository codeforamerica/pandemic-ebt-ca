require 'rails_helper'

RSpec.describe PagesController do
  context "#how" do
    it "unsets current household in session" do
      session[:current_household_id] = "123"
      get :how
      expect(session[:current_household_id]).to be nil
    end
  end
end