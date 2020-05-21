require 'rails_helper'

describe 'Child' do
  describe '#full_name' do
    it 'returns the full name' do
      child = Child.new({ first_name: 'Jane', last_name: 'Smith', dob: '31/12/1999' })
      expect(child.full_name).to eq('Jane Smith')
    end
  end
end
