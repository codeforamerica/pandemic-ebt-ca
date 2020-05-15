require 'rails_helper'

RSpec.describe FormsController do
  describe '#check_household' do
    controller do
      def index
        head :ok
      end
    end

    it 'redirects to the homepage if no household is set on the session' do
      get :index, params: { locale: I18n.default_locale }, session: { current_household_id: nil }
      expect(response).to redirect_to(root_path)
    end
  end
end
