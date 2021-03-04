require 'rails_helper'

RSpec.describe FormNavigation do
  before do
    class BaseController
      def self.show?(_)
        true
      end

      def current_household; end
    end

    class FirstController < BaseController; end

    class SecondController < BaseController; end

    class ThirdController < BaseController; end

    stub_const('FormNavigation::FLOW',
               [
                 FirstController,
                 SecondController,
                 ThirdController
               ])
  end

  describe '.controllers' do
    it 'returns the main flow, not including groupings' do
      expect(described_class.controllers).to match_array([FirstController, SecondController, ThirdController])
    end
  end

  describe '.first' do
    it 'delegates to .controllers' do
      expect(described_class.first).to eq(FirstController)
    end
  end

  describe '#next' do
    context 'when current controller is second to last or before' do
      before do
        allow(SecondController).to receive(:show?).and_return(false)
      end

      it 'returns numeric index for next non-skipped controller in main flow' do
        navigation = described_class.new(FirstController.new)
        expect(navigation.next).to eq(ThirdController)
      end
    end

    context 'when current controller is the last' do
      it 'returns nil' do
        navigation = described_class.new(ThirdController.new)
        expect(navigation.next).to be_nil
      end
    end
  end
end
