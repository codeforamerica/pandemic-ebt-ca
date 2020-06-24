class Household < ApplicationRecord
  has_many :children

  enum is_eligible: { unfilled: 0, yes: 1, no: 2, dont_know: 3 }, _prefix: :is_eligible
  enum received_card: { unfilled: 0, yes: 1, no: 2 }, _prefix: :received_card
  enum has_mailing_address: { unfilled: 0, yes: 1, no: 2 }, _prefix: :has_mailing_address
  enum application_experience: { unfilled: 0, good: 1, ok: 2, bad: 3 }, _suffix: true
  enum experiment_group: { unfilled: 0, ca_early: 1 }
  enum registered_homeless: { unfilled: 0, yes: 1 }, _prefix: :registered_homeless
  enum same_residential_address: { unfilled: 0, yes: 1, no: 2, not_sure: 3 }, _prefix: :same_residential_address

  scope :submitted, -> { where.not(submitted_at: nil) }

  scope :submitted, -> { where.not(submitted_at: nil) }
  scope :unsubmitted, -> { where(submitted_at: nil) }

  def confirmation_code
    children.order(:dob).first.suid.scan(/.{5}/).join('-')
  end

  def youngest_child
    children.order(:dob).last
  end

  def not_homeless?
    registered_homeless != 'yes'
  end

  def street
    mailing_street.or_if_blank(residential_street)
  end

  def street_2
    mailing_street_2.or_if_blank(residential_street_2)
  end

  def city
    mailing_city.or_if_blank(residential_city)
  end

  def zip_code
    mailing_zip_code.or_if_blank(residential_zip_code)
  end
end
