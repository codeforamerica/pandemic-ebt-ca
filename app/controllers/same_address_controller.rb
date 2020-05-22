class SameAddressController < FormsController
  def self.show?(household)
    household.children.count > 1 && household.not_homeless?
  end
end
