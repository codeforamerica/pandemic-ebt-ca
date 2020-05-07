require 'rails_helper'

RSpec.describe EligibleController do
  it_behaves_like 'form controller base behavior', Household.create({ is_eligible: :yes })

  describe '#update' do
    it 'updates the experiment group if present' do
      household = Household.create({ is_eligible: :yes })
      session[:experiment_group] = 'ca_early'
      session[:current_household_id] = household.id
      put :update, params: { form: { is_eligible: 'no' } }

      household.reload

      expect(household.is_eligible).to eq('no')
      expect(household.experiment_group).to eq('ca_early')
    end
  end
end
