class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include AuthenticationConcern
  before_action :set_sentry_context
  before_action :check_locale
  around_action :switch_locale

  def set_sentry_context
    Raven.user_context(id: session[:current_household_id])
    Raven.extra_context(params: params.to_unsafe_h, url: request.url)
  end

  def switch_locale(&action)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale(locale, &action)
  end

  def check_locale
    return if I18n.available_locales.map(&:to_s).include?(params[:locale]) && params[:locale].present?

    redirect_to "/en#{request.fullpath}"
  end

  def default_url_options(options = {})
    { locale: I18n.locale }.merge options
  end
end
