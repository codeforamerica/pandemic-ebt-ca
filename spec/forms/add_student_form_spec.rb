require 'rails_helper'

describe AddStudentForm do
  before do
    @household = Household.create(is_eligible: :yes)
    @valid_form = described_class.new(@household, { first_name: 'Jane', last_name: 'Smith', dob_month: '12', dob_day: '10', dob_year: '2010', school_type: 'public_school' })
  end

  after do
    @household.destroy!
  end

  describe '#save' do
    it 'saves one child to the household' do
      form = @valid_form.dup
      form.valid?
      expect { form.save }.not_to change(Household, :count)
      expect { form.save }.to change { @household.children.count }.by(1)

      @household.reload
      @household.children.first

      expect(@household.children.first.first_name).to eq('Jane')
      expect(@household.children.first.dob.day).to eq(10)
      expect(@household.children.first.dob.month).to eq(12)
      expect(@household.children.first.dob.year).to eq(2010)
      expect(@household.children.first.suid).to be_present
    end
  end

  describe '#presence_of_dob_fields' do
    it 'is invalid if any dob field is not present' do
      form = @valid_form.dup
      form.dob_day = ''
      expect(form).not_to be_valid

      form = @valid_form.dup
      form.dob_month = ''
      expect(form).not_to be_valid

      form = @valid_form.dup
      form.dob_year = ''
      expect(form).not_to be_valid
    end

    it 'is valid if all dob fields are present' do
      form = @valid_form.dup
      expect(form).to be_valid
    end

    it 'only shows one dob error if any of the fields are blank' do
      form = @valid_form.dup
      form.dob_day = ''
      form.valid?
      expect(form.errors.count).to eq(1)
    end
  end

  describe '#presence_of_school_type_field' do
    it 'is invalid if school type is not present' do
      form = @valid_form.dup
      form.school_type = ''
      expect(form).not_to be_valid
    end

    it 'is invalid if school type is not one of the accepted types' do
      form = @valid_form.dup
      form.school_type = 'obviously_invalid_response'
      expect(form).not_to be_valid
    end

    it 'has a relevant error message' do
      form = @valid_form.dup
      form.school_type = ''
      form.valid?
      expect(form.errors.count).to eq(1)
      expect(form.errors.first[1]).to eq('Please select which type of school they attend.')
    end
  end
end
