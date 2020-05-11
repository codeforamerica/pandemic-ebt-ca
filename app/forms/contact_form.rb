class ContactForm < Form
  set_attributes_for :household, :email_address, :email_address_check, :phone_number, :phone_number_check
  validates :email_address, format: { with: URI::MailTo::EMAIL_REGEXP, message: 'Please enter a valid email address.',
                                      if: :email_address_present? }

  before_validation do
    self.phone_number = phone_number.gsub(/[^0-9]/, '')
  end

  validates_length_of :phone_number, is: 10, if: :phone_number_present?,
                                     message: 'Please enter a valid phone number.'

  def save
    attributes = attributes_for(:household)
    attributes.except!(:email_address_check, :phone_number_check)
    household.update(attributes)
  end

  private

  def phone_number_present?
    phone_number.present?
  end

  def email_address_present?
    email_address.present?
  end
end
