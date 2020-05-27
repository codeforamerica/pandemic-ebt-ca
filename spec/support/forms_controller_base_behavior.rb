require 'rails_helper'

RSpec.shared_examples_for 'form controller base behavior' do |household, has_children = false|
  context 'with session' do
    before do
      if has_children
        household.children = [build(:child)]
      end
      session[:current_household_id] = household.id
    end

    describe '#current_household' do
      it 'returns the Household from the id in the session' do
        expect(controller.current_household).to eq household
      end
    end

    describe '#edit' do
      it 'sets the form and renders the template' do
        get :edit, params: { locale: I18n.default_locale }

        expect(response).to render_template(:edit)
        expect(assigns[:form]).to be_a Form
      end
    end

    describe '#current_path' do
      it 'returns the path for this route' do
        expect(controller.current_path).to eq "/en/steps/#{controller.class.to_param}"
      end
    end

    describe '#next_path' do
      it 'returns the next path from this controller' do
        form_navigation = FormNavigation.new(controller)

        expect(controller.next_path).to eq "/en/steps/#{form_navigation.next.to_param}"
      end
    end
  end
end
