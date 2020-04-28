class MailingAddressController < FormsController
  def self.show?(household)
    household.has_mailing_address_yes?
  end
end
