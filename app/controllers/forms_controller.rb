class FormsController < ApplicationController
  before_action :check_household
  helper_method :current_household

  def edit
    @form = form_class.from_household(current_household)
  end

  def update
    if current_household.submitted_at.present?
      redirect_to(success_steps_path)
      return
    end
    @form = form_class.new(current_household, form_params)
    if @form.valid?
      @form.save
      update_session
      redirect_to(next_path)
    else
      render :edit
    end
  end

  def current_path(params = {})
    step_path(self.class.to_param, params)
  end

  def next_path(params = {})
    next_step = form_navigation.next
    step_path(next_step.to_param, params) if next_step
  end

  def self.show?(_household)
    true
  end

  def check_household
    return if session[:current_household_id].present?

    redirect_to root_path
  end

  def current_household
    Household.find_by(id: session[:current_household_id])
  end

  delegate :form_class, to: :class

  def update_session; end

  def form_params
    params.fetch(:form, {}).permit(*form_class.attribute_names)
  end

  def form_navigation
    @form_navigation ||= FormNavigation.new(self)
  end

  class << self
    def to_param
      controller_name.dasherize
    end

    def form_class
      "#{controller_name}_form".classify.constantize
    end
  end
end
