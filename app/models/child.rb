class Child < ApplicationRecord
  belongs_to :household

  enum school_type: {
    public_school: 0,
    private_school: 1
  }

  scope :submitted, -> { includes(:household).where.not(households: { submitted_at: nil }) }
  scope :unsubmitted, -> { includes(:household).where(households: { submitted_at: nil }) }

  scope :submitted_after, ->(submitted_after_time) { submitted.where('households.submitted_at >= ?', submitted_after_time) }
  scope :submitted_before, ->(submitted_before_time) { submitted.where('households.submitted_at < ?', submitted_before_time) }

  scope :by_household, ->(hhid) { includes(:household).where(households: { id: hhid }) }

  def full_name
    "#{first_name} #{last_name}"
  end

  def csv_row
    [
      suid,
      household_id,
      first_name,
      last_name,
      dob,
      school_type.gsub(/_school/, ''),
      household.signature,
      household.residential_street,
      household.residential_street_2,
      household.residential_city,
      'CA',
      household.residential_zip_code,
      household.registered_homeless,
      household.same_residential_address,
      household.has_mailing_address,
      household.clean_street_1,
      household.clean_street_2,
      household.clean_city,
      'CA',
      household.clean_zip_code,
      household.email_address,
      household.language,
      household.submitted_at,
      household.application_experience,
      household.confirmation_code
    ]
  end

  def self.csv_headers
    %w[
      suid
      household_id
      student_first_name
      student_last_name
      student_dob
      student_school_type
      parent_signature
      residential_street
      residential_street_2
      residential_city
      residential_state
      residential_zip_code
      registered_homeless
      all_children_at_same_address
      has_distinct_mailing_address
      mailing_street
      mailing_street_2
      mailing_city
      mailing_state
      mailing_zip_code
      email_address
      language
      submitted_at
      application_experience
      confirmation_code
    ]
  end
end
