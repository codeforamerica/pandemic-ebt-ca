FactoryBot.define do
  factory :household do
    is_eligible { 1 }
    received_card { 2 }
    residential_street { Faker::Address.street_address }
    residential_city { Faker::Address.city }
    residential_zip_code { Faker::Address.zip }
    signature { Faker::Name.name }
    submitted_at { Faker::Time.backward(days: 14) }
    application_experience { %w(unfilled good bad ok)[rand(4)] }
  end
end
