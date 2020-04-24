class Household < ApplicationRecord
  has_many :children

  enum is_eligible: [ :unfilled, :yes, :no, :dont_know ], _prefix: :is_eligible
  enum received_card: [ :unfilled, :yes, :no ], _prefix: :received_card
  enum has_mailing_address: [ :unfilled, :yes, :no ], _prefix: :has_mailing_address
  enum application_experience: [ :unfilled, :good, :ok, :bad ], _suffix: true

  def confirmation_code
    children.order(:dob).first.suid
  end
end
