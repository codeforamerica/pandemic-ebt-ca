require 'rails_helper'
Rails.application.load_tasks

RSpec.describe 'Export Functions', type: :feature do
  describe 'Exporting CSV' do
    let(:output_file) { Rails.root.join('tmp', 'all.csv') }
    before do
      File.delete(output_file) if File.exist?(output_file)
      # Run rake silently:
      @original_stdout = $stdout
      @captured_stdout = StringIO.new
      $stdout = @captured_stdout
    end
    after do
      $stdout = @original_stdout
    end

    it 'Exports all children as a CSV File in /tmp' do
      Rake::Task["export:csv:all"].invoke
      expect(@captured_stdout.string).to have_text('EXPORT COMPLETE')
      expect(File).to exist(output_file)
      file_content = File.read(output_file)
      expect(file_content.lines.length).to eq(Child.all.count)
    end
  end
end
