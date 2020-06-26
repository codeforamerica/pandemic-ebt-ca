require 'rails_helper'

describe EligibleForm do
  describe '#save' do
    context 'with no household' do
      it 'creates a household' do
        expect { described_class.new(Household.new, language: 'en').save }.to change(Household, :count).by(1)
      end

      it 'validates that the submitted language is supported' do
        household = Household.create(is_eligible: :yes)

        form = described_class.new(household, language: 'eo')
        expect(form).not_to be_valid
      end

      it 'saves the language with the household' do
        household = Household.create
        form = described_class.new(household, language: 'en')
        form.valid?
        form.save

        household.reload
        expect(household.language).to eq('en')
      end
    end

    context 'existing household' do
      it 'updates the existing household' do
        household = Household.create(is_eligible: :yes)
        form = described_class.new(household, { is_eligible: :no, language: 'en' })
        form.valid?
        expect { form.save }.not_to change(Household, :count)

        household.reload

        expect(household).to be_is_eligible_no
      end
    end
  end
end
