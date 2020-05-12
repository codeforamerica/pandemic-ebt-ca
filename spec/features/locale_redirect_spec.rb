require 'rails_helper'

RSpec.describe 'Visiting page without locale', type: :feature do
  it 'switches language to default locale' do
    visit '/info'
    expect(URI.parse(current_url).path).to eq '/en/info'
  end
end
