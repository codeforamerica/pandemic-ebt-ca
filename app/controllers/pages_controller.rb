class PagesController < ApplicationController
  before_action :clear_household, except: :info
  caches_page :index, :how, :info

  def index; end

  def how; end

  def info; end

  def early
    if ENV['EXPERIMENT_OVER'] == '1'
      render 'early'
    else
      @is_early = true
      session[:experiment_group] = 'ca_early'
      render 'index'
    end
  end

  private

  def clear_household
    session[:current_household_id] = nil
  end
end
