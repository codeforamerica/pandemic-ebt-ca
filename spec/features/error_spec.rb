require 'rails_helper'

RSpec.describe 'Errors', type: :feature do
  it 'redirects to index and shows an error message when an error is thrown' do
    visit '/i_am_batman'
    expect(page).to have_text('Get help buying food while schools are closed.')
    expect(page).to have_text('There has been a problem on our end.')
  end
end
