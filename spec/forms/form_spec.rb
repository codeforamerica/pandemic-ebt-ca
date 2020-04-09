require "rails_helper"

RSpec.describe Form do
  describe ".attribute_names" do
    it "returns what is set by application and member attributes" do
      class FourthTestForm < Form; end

      FourthTestForm.set_attributes_for :application, :foo
      FourthTestForm.set_attributes_for :member, :bar
      FourthTestForm.set_attributes_for :navigator, :baz

      expect(FourthTestForm.attribute_names).to match_array(%i[foo bar baz])
      expect { FourthTestForm.new(nil).foo }.not_to raise_error
      expect { FourthTestForm.new(nil).bar }.not_to raise_error
      expect { FourthTestForm.new(nil).baz }.not_to raise_error
    end
  end
end
