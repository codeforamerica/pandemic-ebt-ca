class EligibleController < FormsController
  def update_session
    session[:current_household_id] = @form.household.id
  end

  def form_params
    params = super
    if session[:experiment_group].present?
      params[:experiment_group] = session[:experiment_group]
    end
    params
  end
end
