class SameAddressForm < Form
  set_attributes_for :household, :same_residential_address
  validates_presence_of :same_residential_address, message: proc { I18n.t('shared.please_choose') }

  def save
    household.update(attributes_for(:household))
  end
end
