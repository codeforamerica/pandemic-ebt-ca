FactoryBot.define do
  factory :household do
    is_eligible { 1 }
    received_card { 2 }
    residential_street { Faker::Address.unique.street_address }
    residential_city { Faker::Address.city }
    residential_zip_code { Faker::Address.zip }
    signature { Faker::Name.name }
    submitted_at { Faker::Time.backward(days: 14) }
    application_experience { %w[unfilled good bad ok][rand(4)] }
    language { I18n.available_locales[rand(I18n.available_locales.count)] }

    trait :without_mailing_address do
      has_mailing_address { :no }
    end

    trait :with_mailing_address do
      has_mailing_address { :yes }
      mailing_street { Faker::Address.unique.street_address }
      mailing_city { Faker::Address.city }
      mailing_zip_code { Faker::Address.zip }
    end

    trait :unsubmitted do
      submitted_at { nil }
      signature { nil }
    end

    trait :submitted_today do
      submitted_at { 0.seconds.ago }
    end

    trait :submitted_yesterday do
      submitted_at { 24.hours.ago }
    end
  end

  trait :with_email do
    email_address { Faker::Internet.email }
  end
end
