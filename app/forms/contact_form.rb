class ContactForm < Form
  set_attributes_for :household, :email_address, :email_address_check, :phone_number, :phone_number_check
  validates :email_address, format: { with: URI::MailTo::EMAIL_REGEXP, message: 'Please enter a valid email address.' }
  # Look into --> Custom rails validator? validates_inclusion_of :email_address, in: [URI::MailTo::EMAIL_REGEXP, nil]

  before_validation do
    self.phone_number = phone_number.chars.map { |x| x[/\d+/] }.join('')
  end

  validates_length_of :phone_number, is: 10, message: 'Please enter a valid phone number.' #, if: :phone_number_check ?


  def save
    attributes = attributes_for(:household)
    attributes.except!(:email_address_check, :phone_number_check)
    household.update(attributes)
  end
end
