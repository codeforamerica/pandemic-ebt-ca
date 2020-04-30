RSpec.configure do |config|
  config.expect_with :rspec do |expectations|
    expectations.include_chain_clauses_in_custom_matcher_descriptions = true
  end

  config.mock_with :rspec do |mocks|
    mocks.verify_partial_doubles = true
  end

  config.shared_context_metadata_behavior = :apply_to_host_groups

  config.before :each do
    # Clear the caches if they exist:
    File.delete(Rails.root.join('public', 'index.html')) if File.exists?(Rails.root.join('public', 'index.html'))
    File.delete(Rails.root.join('public', 'info.html')) if File.exists?(Rails.root.join('public', 'info.html'))
    File.delete(Rails.root.join('public', 'how.html')) if File.exists?(Rails.root.join('public', 'how.html'))
  end
end
