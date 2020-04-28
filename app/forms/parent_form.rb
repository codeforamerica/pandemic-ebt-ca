class ParentForm < Form
  set_attributes_for :household, :parent_first_name, :parent_last_name
  validates_presence_of :parent_first_name, message: 'Please fill in their first name.'
  validates_presence_of :parent_last_name, message: 'Please fill in their last name.'

  def save
    household.update(attributes_for(:household))
  end
end
