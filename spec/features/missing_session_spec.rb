require 'rails_helper'

RSpec.describe 'Missing session info on application steps', type: :feature do
  it 'redirects back to the home page if session is unset on a form page' do
    visit '/en/steps/signature'
    expect(page).to have_text('Get help buying food while schools are closed.')
  end
end
