require "rails_helper"

RSpec.describe FormNavigation do
  before(:each) do
    class BaseController
      def self.show?(_)
        true
      end

      def current_household; end
    end

    class FirstController < BaseController; end
    class SecondController < BaseController; end
    class ThirdController < BaseController; end

    stub_const("FormNavigation::FLOW",
               [
                   FirstController,
                   SecondController,
                   ThirdController,
               ])
  end

  describe ".controllers" do
    it "returns the main flow, not including groupings" do
      expect(FormNavigation.controllers).to match_array(
       [
           FirstController,
           SecondController,
           ThirdController,
       ],
     )
    end
  end

  describe ".first" do
    it "delegates to .controllers" do
      expect(FormNavigation.first).to eq(FirstController)
    end
  end

  describe "#next" do
    context "when current controller is second to last or before" do
      before do
        allow(SecondController).to receive(:show?) { false }
      end

      it "returns numeric index for next non-skipped controller in main flow" do
        navigation = FormNavigation.new(FirstController.new)
        expect(navigation.next).to eq(ThirdController)
      end
    end

    context "when current controller is the last" do
      it "returns nil" do
        navigation = FormNavigation.new(ThirdController.new)
        expect(navigation.next).to be_nil
      end
    end
  end
end

