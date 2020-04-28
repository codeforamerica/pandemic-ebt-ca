class MealEligibilityForm < Form
  set_attributes_for :household, :is_eligible

  def save
    self.household.update(attributes_for(:household))
  end
end