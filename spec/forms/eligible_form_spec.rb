require "rails_helper"

describe EligibleForm do
  describe "#save" do
    context "no household" do
      it 'should create a household' do
        expect { EligibleForm.new(Household.new).save }.to change { Household.count }.by(1)
      end

      it 'should set a suid' do
        form = EligibleForm.new(Household.new).save
        expect(form.suid).to be_present
      end
    end

    context "existing household" do
      it 'should update the existing household' do
        household = Household.create(is_eligible: :yes)
        form = EligibleForm.new(household, { is_eligible: :no})
        form.valid?
        expect { form.save }.to_not change { Household.count }

        household.reload

        expect(household.is_eligible_no?).to be_truthy
      end
    end
  end
end