class ChildrenForm < Form
  set_attributes_for :child, :first_name, :last_name, :dob_day, :dob_month, :dob_year
  validates_presence_of :first_name, message: "Please fill in their first name."
  validates_presence_of :last_name, message: "Please fill in their last name."
  validate :presence_of_dob_fields

  def save
    form_attributes = attributes_for(:child)
    attributes = {
        first_name: form_attributes[:first_name],
        last_name: form_attributes[:last_name],
        dob: [form_attributes[:dob_month], form_attributes[:dob_day], form_attributes[:dob_year]].join("/")
    }
    self.household.children.create(attributes)
    self.household.save
  end

  private

  def presence_of_dob_fields
    [:dob_year, :dob_month, :dob_day].detect do |attr|
      errors.add(attr, "Please fill in their date of birth.") if public_send(attr).blank?
    end
  end
end