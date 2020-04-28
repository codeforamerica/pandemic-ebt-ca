class EligibleController < FormsController
  def update_session
    session[:current_household_id] = @form.household.id
  end
end
