require 'rails_helper'

RSpec.describe SuccessController do
  it_behaves_like 'form controller always shows'

  context 'when no children have been set up' do
    before do
      household = Household.create({ is_eligible: :yes })
      session[:current_household_id] = household.id
    end

    describe '#edit' do
      it 'redirects to the add children screen' do
        get :edit, params: { locale: I18n.default_locale }

        expect(response.code).to eq '302'
      end
    end
  end
end
