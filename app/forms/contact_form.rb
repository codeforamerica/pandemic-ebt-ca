class ContactForm < Form
  set_attributes_for :household, :email_address
  validates :email_address, format: { with: URI::MailTo::EMAIL_REGEXP, message: 'Please enter a valid email address.',
                                      if: :email_address_present? }

  def save
    attributes = attributes_for(:household)
    attributes.except!(:email_address_check)
    household.update(attributes)
  end

  private

  def email_address_present?
    email_address.present?
  end
end
