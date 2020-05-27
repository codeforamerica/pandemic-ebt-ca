class SuccessController < FormsController
  def edit
    if current_household.children.count.zero?
      flash[:errors] = [I18n.t('validations.please_add_student')]
      redirect_to(children_steps_path)
      return
    end
    super
  end

  def update
    @form = form_class.new(current_household, form_params)
    if @form.valid?
      @form.save
      update_session
      flash[:notice] = I18n.t('success.thank_you')
      redirect_to current_path
    else
      render :edit
    end
  end
end
