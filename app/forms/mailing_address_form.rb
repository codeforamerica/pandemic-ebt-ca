class MailingAddressForm < Form
  set_attributes_for :household, :mailing_street, :mailing_street_2, :mailing_city, :mailing_zip_code, :has_mailing_address
  validates_presence_of :mailing_street, message: 'Please fill in the street address.'
  validates :mailing_street_2, length: { maximum: 128, too_long: 'Please enter a shorter unit or apartment.'}
  validates_presence_of :mailing_city, message: 'Please fill in the city.'
  validates_presence_of :mailing_zip_code, message: 'Please fill in the ZIP code.'

  def save
    household.update(attributes_for(:household))
  end
end
