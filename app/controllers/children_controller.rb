require 'csv'
class ChildrenController < FormsController
  helper_method :children
  skip_before_action :check_household, only: [:index]
  skip_before_action :set_sentry_context, only: [:index]
  skip_before_action :check_locale, only: [:index]
  skip_around_action :switch_locale, only: [:index]

  def index
    @children = Child.submitted
    @children = @children.submitted_after(DateTime.parse(params['after'])) if params['after'].present?
    @children = @children.submitted_before(DateTime.parse(params['before'])) if params['before'].present?
    @children = @children.by_household(params['hhid']) if params['hhid'].present?

    respond_to do |format|
      format.csv
    end
  end

  def children
    current_household.children.presence || []
  end

  def update
    if form_params[:add_child]
      redirect_to(next_path)
    else
      @form = form_class.new(current_household, form_params)
      if @form.valid?
        @form.save
        update_session
        redirect_to(just_so_you_know_steps_path)
      else
        flash.now[:errors] = @form.errors.messages.values.flatten
        render :edit
      end
    end
  end

  def destroy
    child = Child.find(params[:id])
    child.destroy! if child.household.id == session[:current_household_id]
    flash[:notice] = 'Child has been removed'
    redirect_to(children_steps_path)
  end
end
