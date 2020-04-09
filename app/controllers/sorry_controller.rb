class SorryController < FormsController
  def self.show?(household)
    household.is_eligible_no?
  end
end