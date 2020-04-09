require "rails_helper"

RSpec.shared_examples_for "form controller always shows" do
  describe "show?" do
    it "is always true" do
      show_form = subject.class.show?(nil)
      expect(show_form).to eq(true)
    end
  end
end
