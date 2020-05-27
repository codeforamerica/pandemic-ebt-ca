class ResidentialAddressController < FormsController
  def edit
    if current_household.children.count.zero?
      redirect_to(children_steps_path)
      return
    end
    super
  end
end
