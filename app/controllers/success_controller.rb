class SuccessController < FormsController
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
