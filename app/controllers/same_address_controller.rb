class SameAddressController < FormsController
  def self.show?(household)
    household.children.count > 1
  end
end
