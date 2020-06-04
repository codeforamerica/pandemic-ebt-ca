class MetricsController < ApplicationController
  skip_before_action :set_sentry_context, only: [:index]
  skip_before_action :check_locale, only: [:index]
  skip_around_action :switch_locale, only: [:index]

  before_action :http_authenticate

  def index
    @metrics = MetricsReport.new
  end
end
