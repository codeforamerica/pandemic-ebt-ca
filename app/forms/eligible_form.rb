class EligibleForm < Form
  set_attributes_for :household, :is_eligible, :experiment_group, :language
  validates_presence_of :is_eligible, message: proc { I18n.t('shared.please_choose') }

  def save
    if household.persisted?
      household.update(attributes_for(:household))
    else
      self.household = Household.create(attributes_for(:household))
    end
  end
end
