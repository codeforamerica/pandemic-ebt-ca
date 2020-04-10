class ReceivedCardForm < Form
  set_attributes_for :household, :received_card

  def save
    self.household.update(attributes_for(:household))
  end
end