require 'rails_helper'

RSpec.describe PagesController do
  describe '#how' do
    it 'unsets current household in session' do
      session[:current_household_id] = '123'
      get :how, params: { locale: I18n.default_locale }
      expect(session[:current_household_id]).to be nil
    end
  end
end
