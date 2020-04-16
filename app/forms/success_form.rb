class SuccessForm < Form
  set_attributes_for :household, :application_experience

  def save
    self.household.update(attributes_for(:household))
  end
end