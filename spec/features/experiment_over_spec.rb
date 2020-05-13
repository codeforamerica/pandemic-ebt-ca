require 'rails_helper'

RSpec.describe 'Early Screen', type: :feature do
  before do
    stub_const 'ENV', ENV.to_h.merge('COMING_SOON' => '1')
    stub_const 'ENV', ENV.to_h.merge('EXPERIMENT_OVER' => '1')
  end

  describe 'Early page when experiment is over' do
    it 'shows closed message when the EXPERIMENT_OVER environment variable is set' do
      visit '/early'
      expect(page).to have_text 'This test link is now closed'
    end
  end
end
