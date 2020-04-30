class PagesController < ApplicationController
  before_action :clear_household

  caches_page :index, :how, :info

  def index; end

  def how; end

  def info; end

  private

  def clear_household
    session[:current_household_id] = nil
  end
end
