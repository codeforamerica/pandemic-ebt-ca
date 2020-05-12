class FormsController < ApplicationController
  # before_action :ensure_report_present, only: %i[edit update]

  helper_method :current_household #:current_percentage, :self_or_other_member_translation_key

  # layout "left_aligned"

  # def index
  #   render layout: "application"
  # end

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

  def current_household
    Household.find_by(id: session[:current_household_id]) || Household.new
  end

  #
  # def current_percentage
  #   index_of_screens = form_navigation.form_controllers.index(self.class)
  #   if index_of_screens
  #     (100 / form_navigation.form_controllers.length) * index_of_screens
  #   end
  # end
  #
  # def self_or_other_member_translation_key(key, passed_in_member: nil)
  #   member = if passed_in_member.present?
  #              passed_in_member
  #            elsif current_household.current_member.present?
  #              current_household.current_member
  #            elsif current_household.members.where(is_submitter: false).first
  #              current_household.members.where(is_submitter: false).first
  #            elsif current_household.submitter.present?
  #              current_household.submitter
  #            end
  #
  #   member.is_submitter? ? "#{key}.self" : "#{key}.other_member"
  # end
  #
  # private
  #
  delegate :form_class, to: :class
  #
  # # Override in subclasses

  def update_session; end

  def form_params
    params.fetch(:form, {}).permit(*form_class.attribute_names)
  end

  #
  # # Don't override in subclasses
  #
  # def ensure_report_present
  #   if current_household.blank?
  #     redirect_to root_path
  #   end
  # end
  #
  def form_navigation
    @form_navigation ||= FormNavigation.new(self)
  end

  #
  # def send_mixpanel_event
  #   MixpanelService.instance.run(
  #       unique_id: current_household.id,
  #       event_name: @form.class.analytics_event_name,
  #       data: AnalyticsData.new(current_household).to_h,
  #       )
  # end
  #
  # def send_mixpanel_validation_errors
  #   data = {
  #       screen: @form.class.analytics_event_name,
  #       errors: @form.errors.messages.keys,
  #   }
  #
  #   if current_household.present?
  #     data.merge!(AnalyticsData.new(current_household).to_h)
  #   end
  #
  #   MixpanelService.instance.run(
  #       unique_id: current_household.try(:id),
  #       event_name: "validation_error",
  #       data: data,
  #       )
  # end
  #
  # def clear_empty_members
  #   current_household.members.where(first_name: nil, last_name: nil, birthday: nil).destroy_all
  # end
  #
  # def clear_empty_changes
  #   current_household.reported_changes.each do |change|
  #     if change.change_navigator.has_documents_unfilled?
  #       change.destroy
  #     end
  #   end
  # end
  #
  class << self
    def to_param
      controller_name.dasherize
    end

    def form_class
      (controller_name + '_form').classify.constantize
    end
    #
    #   def show_rule_sets(_)
    #     [ShowRules.defaults_to_true]
    #   end
  end
end
