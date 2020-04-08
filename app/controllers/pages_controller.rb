class PagesController < ApplicationController
  def index
  end

  def how
  end

  def meal_eligibility
  end

  def received_card
  end

  def sorry
  end

  def eligible
    @form = current_household
  end

  private

  def current_household
    @household ||= Household.new
  end
end