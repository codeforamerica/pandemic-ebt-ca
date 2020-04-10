class AlreadyReceivedController < FormsController
  def self.show?(household)
    household.received_card_yes?
  end
end