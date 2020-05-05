require 'rails_helper'

RSpec.describe 'Favicons', type: :feature do
  it 'has a root icon' do
    visit '/favicon.ico'
    expect(page).to have_http_status(:success)
  end

  it 'renders the icon links and they are valid' do
    visit '/'
    icon_hrefs = all('link[rel="icon"]', visible: false).map { |l| l['href'] }
    expect(icon_hrefs.count).to eq(4)
    icon_hrefs.each do |r|
      visit r
      expect(page).to have_http_status(:success)
    end
  end

  it 'renders the apple links and they are valid' do
    visit '/'
    icon_hrefs = all('link[rel="apple-touch-icon"]', visible: false).map { |l| l['href'] }
    expect(icon_hrefs.count).to eq(9)
    icon_hrefs.each do |r|
      visit r
      expect(page).to have_http_status(:success)
    end
  end

  it 'renders the other favicon stuff' do
    visit '/'
    expect(page).to have_css('link[rel="manifest"]', visible: false)
    expect(page).to have_css('meta[name="msapplication-TileColor"]', visible: false)
    expect(page).to have_css('meta[name="msapplication-TileImage"]', visible: false)
    expect(page).to have_css('meta[name="theme-color"]', visible: false)
  end
end
