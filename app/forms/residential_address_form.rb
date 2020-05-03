class ResidentialAddressForm < Form
  set_attributes_for :household, :residential_street, :residential_street_2, :residential_city, :residential_zip_code, :has_mailing_address
  validates_presence_of :residential_street, message: 'Please fill in the street address.'
  validates :residential_street_2, length: { maximum: 128, too_long: 'Please enter a shorter unit or apartment.'}
  validates_presence_of :residential_city, message: 'Please fill in the city.'
  validates_presence_of :residential_zip_code, message: 'Please fill in the ZIP code.'
  validates_presence_of :has_mailing_address, message: 'Please choose where to send mail.'

  def save
    household.update(attributes_for(:household))
  end
end
