require 'rails_helper'

RSpec.describe 'Metrics', type: :feature do
  def set_auth
    @username = 'cris_p_bacon'
    @pw = 'i_like_turtles'
    stub_const 'ENV', ENV.to_h.merge('METRICS_PASSWORD' => @pw, 'METRICS_USERNAME' => @username)
  end

  context 'no username/password set in ENV' do
    it 'redirect back to the home page' do
      visit '/metrics'
      expect(page).to have_current_path('/?locale=en')
    end
  end

  context 'username/password set in ENV' do
    before do
      set_auth
      ActionController::HttpAuthentication::Basic.encode_credentials @username, @pw
      page.driver.browser.authorize(@username, @pw)

      create_list(:household, 4) do |h, i|
        create_list(:child, 2, household_id: h.id)
        h.created_at = (Time.zone.today - i.days).beginning_of_day
        h.submitted_at = (Time.zone.today - i.days).beginning_of_day + (5 + i).minutes
        h.application_experience = i
        h.save
      end
      visit '/metrics'
    end

    it 'shows the total number of submitted applications' do
      within('#totals') { expect(page).to have_content('4') }
    end

    it 'shows the total number of children in submitted applications' do
      within('#totals') { expect(page).to have_content('8') }
    end

    it 'shows submissions from the last four days' do
      within('#daily') do
        expect(page).to have_content('1')
        expect(page).to have_content('1')
        expect(page).to have_content('1')
        expect(page).to have_content('1')
      end
    end

    it 'shows percentages for each application experience response' do
      within('#application_experience') do
        expect(page).to have_content('33% 😄')
        expect(page).to have_content('33% 😐')
        expect(page).to have_content('33% 🙁')
      end
    end

    it 'shows median minutes and seconds of completion for the last 5000 records' do
      within('#median') do
        expect(page).to have_content('06m 30s ⏱')
      end
    end
  end

  context 'visiting /metrics when unauthorized' do
    it 'returns unauthorized' do
      set_auth

      visit '/metrics'
      expect(page).to have_http_status(:unauthorized)
    end
  end
end
