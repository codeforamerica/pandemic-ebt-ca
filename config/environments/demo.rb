require File.expand_path('../production.rb', __FILE__)

Rails.application.configure do
  config.hosts << 'app-20048.on-aptible.com'
  config.hosts << 'ca-demo.p-ebt.org'
end
