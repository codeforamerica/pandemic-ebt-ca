require 'rails_helper'

describe Household do
  describe '#confirmation_code' do
    it 'displays the formatted suid of the oldest child' do
      older_child = Child.new({ first_name: 'Jane', last_name: 'Smith', dob: '31/12/1999', school_type: 'public_school', suid: '70CFAOLDERCHILDSUID9' })
      younger_child = Child.new({ first_name: 'Joe', last_name: 'Smith', dob: '01/01/2000', school_type: 'private_school', suid: '70CFAYOUNGCHILDSUID8' })
      household = described_class.new
      household.children = [younger_child, older_child]
      household.save!
      expect(household.confirmation_code).to eq('70CFA-OLDER-CHILD-SUID9')
    end
  end

  describe '#youngest_child' do
    it 'returns the youngest child' do
      older_child = Child.new({ first_name: 'Jane', last_name: 'Smith', dob: '31/12/1999', school_type: 'public_school', suid: '70CFAOLDERCHILDSUID9' })
      younger_child = Child.new({ first_name: 'Joe', last_name: 'Smith', dob: '01/01/2000', school_type: 'private_school', suid: '70CFAYOUNGCHILDSUID8' })
      household = described_class.new
      household.children = [younger_child, older_child]
      household.save!
      expect(household.youngest_child.first_name).to eq('Joe')
    end
  end

  describe '#street' do
    it 'returns residential street' do
      h = build(:household, residential_street: 'Fake Street')
      expect(h.street).to eq(h.residential_street)
    end

    it 'returns mailing_street if residential_street is blank' do
      h = build(:household, residential_street: '', mailing_street: 'Fake Mailing Street')
      expect(h.street).to eq(h.mailing_street)
    end
  end

  describe '#street_2' do
    it 'returns residential_street_2' do
      h = build(:household, residential_street_2: 'Fake Street')
      expect(h.street_2).to eq(h.residential_street_2)
    end

    it 'returns mailing_street_2 if residential_street_2 is blank' do
      h = build(:household, residential_street_2: '', mailing_street_2: 'Fake Mailing Street')
      expect(h.street_2).to eq(h.mailing_street_2)
    end
  end

  describe '#city' do
    it 'returns residential city' do
      h = build(:household, residential_city: 'Fake City')
      expect(h.city).to eq(h.residential_city)
    end

    it 'returns mailing_city if residential_city is blank' do
      h = build(:household, residential_city: '', mailing_city: 'Fake City')
      expect(h.city).to eq(h.mailing_city)
    end
  end

  describe '#zip_code' do
    it 'returns residential zip_code' do
      h = build(:household, residential_zip_code: 'Fake Zipcode')
      expect(h.zip_code).to eq(h.residential_zip_code)
    end

    it 'returns mailing_zip_code if residential_zip_code is blank' do
      h = build(:household, residential_zip_code: '', mailing_zip_code: 'Fake Zipcode')
      expect(h.zip_code).to eq(h.mailing_zip_code)
    end
  end
end
