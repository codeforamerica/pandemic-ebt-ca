require 'rails_helper'
require 'csv'
Rails.application.load_tasks

HEADERS = %w[suid household_id student_first_name student_last_name student_dob student_school_type parent_signature residential_street residential_street_2 residential_city residential_state residential_zip_code mailing_street mailing_street_2 mailing_city mailing_state mailing_zip_code phone_number email_address language submitted_at application_experience confirmation_code].freeze

RSpec.describe 'Exporting Children as CSV', type: :feature do
  before(:all) do
    @output_file_name = Rails.root.join('tmp', 'all.csv')
    create_list(:child, 20)
    File.delete(@output_file_name) if File.exist?(@output_file_name)

    # Run rake silently:
    @original_stdout = $stdout
    @captured_stdout = StringIO.new
    $stdout = @captured_stdout
    Rake::Task['export:csv:all'].invoke
    $stdout = @original_stdout
  end

  it 'Shows a confirmation message on the console' do
    expect(@captured_stdout.string).to have_text('EXPORT COMPLETE')
  end

  it 'Creates a file called /tmp/all.csv' do
    expect(File).to exist(@output_file_name)
  end

  it 'Exports all children' do
    csv_data = CSV.read(@output_file_name, headers: true)
    expect(csv_data.count).to eq(Child.all.count)
  end

  it 'Has the proper headers' do
    csv_data = CSV.read(@output_file_name, headers: true)
    expect(csv_data.headers).to eq(HEADERS)
  end

  it 'Fills all mailing addresses, duplicating residential data where required' do
    csv_data = CSV.read(@output_file_name, headers: true)
    expect(csv_data.map { |r| r['mailing_street'] }).to all(be_present)
  end
end
