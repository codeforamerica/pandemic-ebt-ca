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

  STATE = 'CA'.freeze

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
      STATE,
      household.residential_zip_code,
      household.registered_homeless,
      household.same_residential_address,
      household.has_mailing_address,
      household.street,
      household.street_2,
      household.city,
      STATE,
      household.zip_code,
      household.email_address,
      household.language,
      household.submitted_at,
      household.application_experience,
      household.confirmation_code,
      household.clean_residential_street,
      household.clean_residential_street_2,
      household.clean_residential_city,
      household.clean_residential_zip_code,
      STATE,
      household.clean_mailing_street,
      household.clean_mailing_street_2,
      household.clean_mailing_city,
      household.clean_mailing_zip_code,
      STATE
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
      clean_residential_street
      clean_residential_street_2
      clean_residential_city
      clean_residential_zip_code
      clean_residential_state
      clean_mailing_street
      clean_mailing_street_2
      clean_mailing_city
      clean_mailing_zip_code
      clean_mailing_state
    ]
  end
end
