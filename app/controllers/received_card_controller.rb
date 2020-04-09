class ReceivedCardController < FormsController
  def self.show?(household)
    household.is_eligible_yes?
  end
end