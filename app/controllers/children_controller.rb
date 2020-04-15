class ChildrenController < FormsController

  def update
    @form = form_class.new(current_household, form_params)
    if @form.valid?
      @form.save
      update_session
      if form_params[:add_child]
        redirect_to(children_steps_path)
      else
        redirect_to(next_path)
      end
    else
      render :edit
    end
  end

  def destroy
    child = Child.find(params[:id])
    if child.household.id == session[:current_household_id]
      child.destroy!
    end
    flash[:notice] = "Child has been removed"
    redirect_to(children_steps_path)
  end
end