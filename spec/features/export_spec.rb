require 'rails_helper'
Rails.application.load_tasks

RSpec.describe 'Export Functions', type: :feature do
  describe 'Exporting CSV' do
    let(:output_file) { Rails.root.join('tmp', 'all.csv') }
    before do
      File.delete(output_file) if File.exist?(output_file)
    end

    it 'Exports a CSV File in /tmp' do
      Rake::Task["export:csv:all"].invoke
      expect(File(output_file)).to exist
    end
  end
end
