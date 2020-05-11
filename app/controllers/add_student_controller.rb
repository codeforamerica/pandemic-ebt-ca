class AddStudentController < FormsController
  def update
    @form = form_class.new(current_household, form_params)
    if @form.valid?
      @form.save
      update_session
      redirect_to(children_steps_path)
    else
      render :edit
    end
  end
end
