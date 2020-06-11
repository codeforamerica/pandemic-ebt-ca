class AddStudentForm < Form
  set_attributes_for :child, :first_name, :last_name, :dob_day, :dob_month, :dob_year, :school_type
  validates_presence_of :first_name, message: proc { I18n.t('validations.first_name') }
  validates_presence_of :last_name, message: proc { I18n.t('validations.last_name') }
  validates :school_type, inclusion: { in: Child.school_types.keys, message: proc { I18n.t('validations.school_type') } }
  validate :presence_of_dob_fields
  validate :validity_of_date

  def save
    form_attributes = attributes_for(:child)
    attributes = {
      first_name: form_attributes[:first_name],
      last_name: form_attributes[:last_name],
      dob: [form_attributes[:dob_day], form_attributes[:dob_month], form_attributes[:dob_year]].join('/'),
      school_type: form_attributes[:school_type],
      suid: SuidGenerator.generate
    }
    household.children.create(attributes)
    household.save
  end

  private

  def date_in_future?(dob)
    dob.present? && dob.future?
  end

  def validity_of_date
    dob = Date.parse [@dob_day, @dob_month, @dob_year].join('/') if @dob_day.present? && @dob_month.present? && @dob_year.present?
    errors.add(:dob, proc { I18n.t('validations.dob') }) if date_in_future?(dob)
  rescue ArgumentError
    errors.add(:dob, proc { I18n.t('validations.dob') })
  end

  def presence_of_dob_fields
    %i[dob_year dob_month dob_day].detect do |attr|
      errors.add(:dob, proc { I18n.t('validations.dob') }) if public_send(attr).blank?
    end
  end
end
