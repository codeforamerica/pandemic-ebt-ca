class Household < ApplicationRecord
  has_many :children

  enum is_eligible: { unfilled: 0, yes: 1, no: 2, dont_know: 3 }, _prefix: :is_eligible
  enum received_card: { unfilled: 0, yes: 1, no: 2 }, _prefix: :received_card
  enum has_mailing_address: { unfilled: 0, yes: 1, no: 2 }, _prefix: :has_mailing_address
  enum application_experience: { unfilled: 0, good: 1, ok: 2, bad: 3 }, _suffix: true
  enum experiment_group: { unfilled: 0, ca_early: 1 }
  enum registered_homeless: { unfilled: 0, yes: 1 }, _prefix: :registered_homeless
  enum same_residential_address: { unfilled: 0, yes: 1, no: 2, not_sure: 3 }, _prefix: :same_residential_address

  def confirmation_code
    children.order(:dob).first.suid.scan(/.{5}/).join('-')
  end

  def youngest_child
    children.order(:dob).last
  end
end
