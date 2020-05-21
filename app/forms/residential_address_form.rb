class ResidentialAddressForm < Form
  set_attributes_for :household, :residential_street, :residential_street_2, :residential_city, :residential_zip_code, :has_mailing_address, :registered_homeless
  validates_presence_of :residential_street, message: 'Please fill in the street address.', if: :registered_homeless_unfilled?
  validates :residential_street_2, length: { maximum: 128, too_long: 'Please enter a shorter unit or apartment.' }, if: :registered_homeless_unfilled?
  validates_presence_of :residential_city, message: 'Please fill in the city.', if: :registered_homeless_unfilled?
  validates_presence_of :has_mailing_address, message: 'Please choose where to send mail.', if: :registered_homeless_unfilled?
  validates :residential_zip_code, inclusion: { in: VALID_ZIP_CODES, message: 'Please fill in a valid CA ZIP code.' }, if: :registered_homeless_unfilled?

  def save
    household.update(attributes_for(:household))
  end

  def registered_homeless_unfilled?
    registered_homeless == 'unfilled'
  end
end
