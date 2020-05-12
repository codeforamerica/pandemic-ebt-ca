require 'rails_helper'
require 'csv'
Rails.application.load_tasks

HEADERS = %w[suid household_id student_first_name student_last_name student_dob student_school_type parent_signature residential_street residential_street_2 residential_city residential_state residential_zip_code mailing_street mailing_street_2 mailing_city mailing_state mailing_zip_code phone_number email_address language submitted_at application_experience confirmation_code].freeze

RSpec.describe 'Exporting Children as CSV', type: :feature do
  before(:all) do
    @output_file_name = Rails.root.join('tmp', 'all.csv')
    @household_with_mailing_address = create :household, :with_mailing_address
    @household_without_mailing_address = create :household, :without_mailing_address
    @child_with_mailing_address = create(:child, household_id: @household_with_mailing_address.id, first_name: 'Mailing', last_name: 'Kid')
    @child_without_mailing_address = create(:child, household_id: @household_without_mailing_address.id, first_name: 'NoMailing', last_name: 'Kid')
    create_list(:child, 20)
    File.delete(@output_file_name) if File.exist?(@output_file_name)

    # Run rake silently:
    @original_stdout = $stdout
    @captured_stdout = StringIO.new
    $stdout = @captured_stdout
    Rake::Task['export:csv:all'].invoke
    $stdout = @original_stdout
  end

  after(:all) do
    # prevent data leakage:
    Child.destroy_all
    Household.destroy_all
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

    mailing_address_row = csv_data.find { |r| r['suid'] == @child_with_mailing_address.suid }
    expect(mailing_address_row['mailing_street']).to eq(@household_with_mailing_address.mailing_street)
    expect(mailing_address_row['mailing_street']).not_to eq(mailing_address_row['residential_street'])

    expect(@child_without_mailing_address.household.mailing_street).to be_blank
    no_mailing_address_row = csv_data.find { |r| r['suid'] == @child_without_mailing_address.suid }
    expect(no_mailing_address_row['mailing_street']).not_to be_blank
    expect(no_mailing_address_row['mailing_street']).to eq(no_mailing_address_row['residential_street'])
  end

  it 'Exports the language' do
    csv_data = CSV.read(@output_file_name, headers: true)
    expect(csv_data.map { |r| r['language'] }).to all(be_present)
  end
end
