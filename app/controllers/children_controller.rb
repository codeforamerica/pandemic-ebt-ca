class ChildrenController < FormsController
  helper_method :children

  def children
    current_household.children.presence || []
  end

  def update
    redirect_to(next_path) if form_params[:add_child]
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

  def destroy
    child = Child.find(params[:id])
    child.destroy! if child.household.id == session[:current_household_id]
    flash[:notice] = 'Child has been removed'
    redirect_to(children_steps_path)
  end
end
