require 'rails_helper'

describe ChildrenForm do
  before do
    @household = Household.create(is_eligible: :yes)
  end

  after do
    @household.destroy!
  end

  describe '#save' do
    it 'saves one child to the household' do
      form = described_class.new(@household, { first_name: 'Jane', last_name: 'Smith',
                                               dob_month: '01', dob_day: '09', dob_year: '2010' })
      form.valid?
      expect { form.save }.not_to change(Household, :count)
      expect { form.save }.to change { @household.children.count }.by(1)

      @household.reload
      @household.children.first

      expect(@household.children.first.first_name).to eq('Jane')
      expect(@household.children.first.dob).to eq(Date.parse('01/09/2010'))
      expect(@household.children.first.suid).to be_present
    end
  end

  describe '#presence_of_dob_fields' do
    it 'is invalid if any dob field is present' do
      form = described_class.new(@household, { first_name: 'Jane', last_name: 'Smith', dob_month: '', dob_day: '09', dob_year: '2010' })
      expect(form).not_to be_valid

      form = described_class.new(@household, { first_name: 'Jane', last_name: 'Smith', dob_month: '12', dob_day: '', dob_year: '2010' })
      expect(form).not_to be_valid

      form = described_class.new(@household, { first_name: 'Jane', last_name: 'Smith', dob_month: '12', dob_day: '12', dob_year: '' })
      expect(form).not_to be_valid
    end

    it 'is valid if all dob fields are present' do
      form = described_class.new(@household, { first_name: 'Jane', last_name: 'Smith', dob_month: '12', dob_day: '12', dob_year: '2010' })
      expect(form).to be_valid
    end

    it 'onlies show one dob error if any of the fields are blank' do
      form = described_class.new(@household, { first_name: 'Jane', last_name: 'Smith', dob_month: '', dob_day: '12', dob_year: '2020' })
      form.valid?
      expect(form.errors.count).to eq(1)
    end
  end
end
