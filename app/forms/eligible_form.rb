class EligibleForm < Form
  set_attributes_for :household, :is_eligible
  validates_presence_of :is_eligible, message: "Please choose an option."

  def save
    self.household = Household.create(attributes_for(:household))
  end
end