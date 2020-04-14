class Household < ApplicationRecord
  has_many :children

  enum is_eligible: [ :unfilled, :yes, :no, :dont_know ], _prefix: :is_eligible
  enum received_card: [ :unfilled, :yes, :no ], _prefix: :received_card
end
