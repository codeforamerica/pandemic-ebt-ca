class SignatureForm < Form
  NULL_BYTE = "\u0000".freeze
  set_attributes_for :household, :signature
  validates_presence_of :signature, message: proc { I18n.t('validations.signature') }

  def save
    form_attributes = attributes_for(:household)
    attributes = {
      signature: form_attributes[:signature].gsub(NULL_BYTE, ' ').strip
    }
    household.update(attributes.merge({ submitted_at: Time.zone.now }))
  end
end
