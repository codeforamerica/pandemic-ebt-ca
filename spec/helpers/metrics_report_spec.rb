require 'rails_helper'

RSpec.describe MetricsReport do
  before do
    create_list(:household, 3) do |h, i|
      create_list(:child, 2, household_id: h.id)
      h.created_at = (Time.zone.today - i.days).beginning_of_day
      h.submitted_at = (Time.zone.today - i.days).beginning_of_day + (5 + i).minutes
      h.application_experience = i
      h.save
    end
  end

  describe '#total_applications' do
    it 'returns total submitted households by default' do
      expect(described_class.new.total_applications).to eq(3)
    end

    it 'returns specified days worth of submitted households' do
      expect(described_class.new.total_applications(Time.zone.today)).to eq(1)
    end
  end

  describe '#total_children' do
    it 'returns total submitted households' do
      expect(described_class.new.total_children).to eq(6)
    end
  end

  describe '#application_experience' do
    it 'returns a percentage of the provided application experience' do
      expect(described_class.new.application_experience(:good)).to eq('50%')
      expect(described_class.new.application_experience(:ok)).to eq('50%')
      expect(described_class.new.application_experience(:bad)).to eq('0%')
    end
  end

  describe '#median_ttc' do
    context 'at least one record' do
      it 'returns the median time to complete for recent records' do
        expect(described_class.new.median_ttc).to eq('06m 00s')
      end
    end

    context 'no records' do
      it 'returns N/A' do
        Household.destroy_all
        expect(described_class.new.median_ttc).to eq('N/A')
      end
    end
  end
end
