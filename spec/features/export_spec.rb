require 'rails_helper'
require 'csv'

HEADERS = %w[ suid household_id student_first_name student_last_name student_dob student_school_type parent_signature
              residential_street residential_street_2 residential_city residential_state residential_zip_code
              registered_homeless same_residential_address mailing_street mailing_street_2 mailing_city mailing_state
              mailing_zip_code email_address language submitted_at application_experience confirmation_code ].freeze

RSpec.describe 'Exporting Children as CSV', type: :feature do
  def row_for_child(child)
    @csv_data.find { |r| r['suid'] == child.suid }
  end

  before(:all) do
    Child.delete_all
    Household.delete_all
    @output_file_name = Rails.root.join('tmp', 'all.csv')
    @unsubmitted_child = create(:child, household: create(:household, :unsubmitted))
    @child_with_email = create(:child, household_id: create(:household, :with_email).id)
    @child_with_mailing_address = create(:child, household_id: create(:household, :with_mailing_address).id)
    @child_without_mailing_address = create(:child, household_id: create(:household, :without_mailing_address).id)

    create_list(:child, 20)
    File.delete(@output_file_name) if File.exist?(@output_file_name)

    @captured_stdout = `thor export:children`
  end

  before do
    @csv_data = CSV.read(@output_file_name, headers: true)
  end

  after(:all) do
    # prevent data leakage:
    Child.destroy_all
    Household.destroy_all
  end

  it 'Shows a confirmation message on the console' do
    expect(@captured_stdout).to have_text('EXPORT COMPLETE')
  end

  it 'Creates a file called /tmp/all.csv' do
    expect(File).to exist(@output_file_name)
  end

  it 'Exports all children' do
    expect(@csv_data.count).to eq(Child.submitted.count)
  end

  it 'Has the proper headers' do
    expect(@csv_data.headers).to eq(HEADERS)
  end

  it 'Fills all mailing addresses, duplicating residential data where required' do
    expect(@csv_data.map { |r| r['mailing_street'] }).to all(be_present)

    mailing_address_row = row_for_child @child_with_mailing_address
    expect(mailing_address_row['mailing_street']).to eq(@child_with_mailing_address.household.mailing_street)
    expect(mailing_address_row['mailing_street']).not_to eq(mailing_address_row['residential_street'])

    expect(@child_without_mailing_address.household.mailing_street).to be_blank
    no_mailing_address_row = row_for_child @child_without_mailing_address
    expect(no_mailing_address_row['mailing_street']).not_to be_blank
    expect(no_mailing_address_row['mailing_street']).to eq(no_mailing_address_row['residential_street'])
  end

  it 'Exports the language' do
    expect(@csv_data.map { |r| r['language'] }).to all(be_present)
  end

  it 'Exports email address if present' do
    email_row = row_for_child @child_with_email
    expect(@child_with_email.household.email_address).to be_present
    expect(email_row['email_address']).to eq(@child_with_email.household.email_address)
  end

  it 'Only exports submitted children' do
    unsubmitted_child_row = row_for_child @unsubmitted_child
    expect(unsubmitted_child_row).to eq(nil)
  end
end
