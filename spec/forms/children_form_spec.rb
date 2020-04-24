require "rails_helper"

describe ChildrenForm do
  before(:each) do
    @household = Household.create(is_eligible: :yes)
  end

  after(:each) do
    @household.destroy!
  end

  describe "#save" do
    it 'saves one child to the household' do
      form = ChildrenForm.new(@household, {first_name: "Jane", last_name: "Smith",
                                           dob_month: "01", dob_day: "09", dob_year: "2010"})
      form.valid?
      expect { form.save }.to_not change { Household.count }
      expect { form.save }.to change { @household.children.count }.by(1)

      @household.reload
      @household.children.first

      expect(@household.children.first.first_name).to eq("Jane")
      expect(@household.children.first.dob).to eq(Date.parse("01/09/2010"))
      expect(@household.children.first.suid).to be_present
    end
  end

  describe "#presence_of_dob_fields" do
    it 'should be invalid if any dob field is present' do
      form = ChildrenForm.new(@household,{first_name: "Jane", last_name: "Smith", dob_month: "", dob_day: "09", dob_year: "2010"})
      expect(form.valid?).to be_falsey

      form = ChildrenForm.new(@household,{first_name: "Jane", last_name: "Smith", dob_month: "12", dob_day: "", dob_year: "2010"})
      expect(form.valid?).to be_falsey

      form = ChildrenForm.new(@household,{first_name: "Jane", last_name: "Smith", dob_month: "12", dob_day: "12", dob_year: ""})
      expect(form.valid?).to be_falsey
    end

    it 'should be valid if all dob fields are present' do
      form = ChildrenForm.new(@household,{first_name: "Jane", last_name: "Smith", dob_month: "12", dob_day: "12", dob_year: "2010"})
      expect(form.valid?).to be_truthy
    end

    it 'should only show one dob error if any of the fields are blank' do
      form = ChildrenForm.new(@household,{first_name: "Jane", last_name: "Smith", dob_month: "", dob_day: "12", dob_year: "2020"})
      form.valid?
      expect(form.errors.count).to eq(1)
    end
  end
end