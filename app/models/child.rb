class Child < ApplicationRecord
  belongs_to :household

  enum school_type: {
    public_school: 0,
    private_school: 1
  }

  scope :submitted, -> { joins(:household).where.not(households: { submitted_at: nil }) }
end
