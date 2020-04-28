require 'rails_helper'

describe EligibleForm do
  describe '#save' do
    context 'no household' do
      it 'creates a household' do
        expect { described_class.new(Household.new).save }.to change(Household, :count).by(1)
      end
    end

    context 'existing household' do
      it 'updates the existing household' do
        household = Household.create(is_eligible: :yes)
        form = described_class.new(household, { is_eligible: :no })
        form.valid?
        expect { form.save }.not_to change(Household, :count)

        household.reload

        expect(household).to be_is_eligible_no
      end
    end
  end
end
