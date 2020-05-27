class ResidentialAddressController < FormsController
  def edit
    if current_household.children.count.zero?
      flash[:errors] = [I18n.t('validations.please_add_student')]
      redirect_to(children_steps_path)
      return
    end
    super
  end
end
