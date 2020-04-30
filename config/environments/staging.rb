require File.expand_path('../production.rb', __FILE__)

Rails.application.configure do
  config.hosts << 'app-19965.on-aptible.com'
  config.hosts << 'ca-staging.p-ebt.org'
end
