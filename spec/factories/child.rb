FactoryBot.define do
  factory :child do
    household
    first_name { Faker::Name.first_name }
    last_name { Faker::Name.last_name }
    dob { Faker::Date.between(from: 5.years.ago, to: 17.years.ago) }
    school_type { %w(public_school private_school)[rand(2)] }
    suid { SuidGenerator.generate }
  end
end
