require 'rails_helper'

RSpec.describe 'Info page', type: :feature do
  it 'switches language to Spanish' do
    visit '/en/info'
    click_on 'Español'
    expect(page).to have_text 'Información sobre P-EBT'
  end
end
