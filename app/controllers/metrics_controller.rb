class MetricsController < ApplicationController
  skip_before_action :set_sentry_context, only: [:index]
  skip_before_action :check_locale, only: [:index]
  skip_around_action :switch_locale, only: [:index]

  before_action :authenticate

  def index
    @metrics = MetricsReport.new
  end

  def authenticate
    if ENV['METRICS_USERNAME'].blank?
      flash[:error] = 'There has been a problem on our end.'
      redirect_back(fallback_location: root_path)
    else
      authenticate_or_request_with_http_basic do |username, password|
        username == ENV['METRICS_USERNAME'] && password == ENV['METRICS_PASSWORD']
      end
    end
  end
end
