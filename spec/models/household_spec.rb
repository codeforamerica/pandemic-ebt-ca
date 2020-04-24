require 'rails_helper'

describe Household do
  describe "#confirmation_code" do
    it 'should display the suid of the oldest child' do
      older_child = Child.new({first_name: "Jane", last_name: "Smith", dob: "31/12/1999", suid: "CFAOLDER"})
      younger_child = Child.new({first_name: "Jane", last_name: "Smith", dob: "01/01/2000", suid: "CFAYOUNGER"})
      household = Household.new
      household.children = [younger_child, older_child]
      household.save!
      expect(household.confirmation_code).to eq(older_child.suid)
    end
  end
end