class ChildrenForm < Form
  set_attributes_for :household, :children_added, :add_child
  validates_inclusion_of :children_added, in: ['true'], message: I18n.t('validations.please_add_student')
  def save; end
end
