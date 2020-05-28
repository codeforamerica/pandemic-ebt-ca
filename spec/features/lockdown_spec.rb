require 'rails_helper'

RSpec.describe 'Lockdown', type: :feature do
  before do
    stub_const 'ENV', ENV.to_h.merge('AUTH_PASSWORD' => 'i_like_turtles', 'AUTH_USERNAME' => 'cris_p_bacon')
    @credentials = ActionController::HttpAuthentication::Basic.encode_credentials 'cris_p_bacon', 'i_like_turtles'
  end

  it 'requires authentication when set' do
    visit '/'
    expect(page).to have_http_status(:unauthorized)
  end

  it 'works when authorized' do
    page.driver.browser.authorize('cris_p_bacon', 'i_like_turtles')
    visit '/'
    expect(page).to have_text 'Get help buying food while schools are closed'
  end
end
