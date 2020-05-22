class SignatureForm < Form
  set_attributes_for :household, :signature
  validates_presence_of :signature, message: proc { I18n.t('validations.signature') }

  def save
    household.update(attributes_for(:household).merge({ submitted_at: Time.zone.now }))
  end
end
