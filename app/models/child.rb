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
end
