class ChildrenForm < Form
  set_attributes_for :household, :children_added, :add_child
  validates_inclusion_of :children_added, in: ['true'], message: 'Please add a student.'
  def save; end
end
