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
end