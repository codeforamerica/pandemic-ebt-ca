class EligibleController < FormsController
  def update_session
    session[:current_household_id] = @form.household.id
  end

  def edit
    @form = form_class.from_household(Household.new)
  end

  def update
    @form = form_class.new(Household.new, form_params)
    if @form.valid?
      @form.save
      update_session
      redirect_to(next_path)
    else
      render :edit
    end
  end

  def form_params
    params = super
    params[:experiment_group] = session[:experiment_group] if session[:experiment_group].present?
    params
  end

  def check_household; end
end
