class Household < ApplicationRecord
  enum is_eligible: [ :unfilled, :yes, :no, :dont_know ], _prefix: :is_eligible
end
