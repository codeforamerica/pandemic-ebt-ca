class ResidentialAddressForm < Form
  set_attributes_for :household, :residential_street, :residential_street_2, :residential_city, :residential_zip_code, :has_mailing_address, :registered_homeless
  validates_presence_of :residential_street, message: proc { I18n.t('validations.address') }, if: :registered_homeless_unfilled?
  validates :residential_street_2, length: { maximum: 128, too_long: proc { I18n.t('validations.address_2') } }, if: :registered_homeless_unfilled?
  validates_presence_of :residential_city, message: proc { I18n.t('validations.city') }, if: :registered_homeless_unfilled?
  validates_presence_of :has_mailing_address, message: proc { I18n.t('validations.choose_address') }, if: :registered_homeless_unfilled?
  validates :residential_zip_code, inclusion: { in: VALID_ZIP_CODES, message: proc { I18n.t('validations.zip_code') } }, if: :registered_homeless_unfilled?

  def save
    household.update(attributes_for(:household))
  end

  def registered_homeless_unfilled?
    registered_homeless == 'unfilled'
  end
end
