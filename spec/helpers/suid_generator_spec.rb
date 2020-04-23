require "rails_helper"

describe SuidGenerator do
  describe "#generate" do
    it 'should generate a string starting with 70CFA' do
      expect(SuidGenerator.generate[0..4]).to eq("70CFA")
    end

    it 'should be 15 characters long' do
      expect(SuidGenerator.generate.length).to eq(15)
    end

    it 'should be uppercase' do
      suid = SuidGenerator.generate
      expect(suid).to eq(suid.upcase)
    end

    it 'should not contain 0, O, 1, or I' do
      suid = SuidGenerator.generate
      expect(suid[2..15]).not_to include("0","O","I","1")
    end
  end
end