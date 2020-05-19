require 'rails_helper'

describe SuidGenerator do
  describe '#generate' do
    it 'generates a string starting with 70CFA' do
      expect(described_class.generate[0..4]).to eq('70CFA')
    end

    it 'is 15 characters long' do
      expect(described_class.generate.length).to eq(15)
    end

    it 'is uppercase' do
      suid = described_class.generate
      expect(suid).to eq(suid.upcase)
    end

    it 'does not contain 0, O, 1, or I' do
      suid = described_class.generate
      expect(suid[2..15]).not_to include('0', 'O', 'I', '1')
    end

    it 'generates unique suids' do
      100.times { create(:child) }
      expect(Child.all.map(&:suid).uniq.count).to eq(Child.count)
    end
  end
end
