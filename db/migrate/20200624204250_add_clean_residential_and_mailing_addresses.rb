class AddCleanResidentialAndMailingAddresses < ActiveRecord::Migration[6.0]
  def change
    rename_column :households, :clean_street_1, :clean_residential_street
    rename_column :households, :clean_street_2, :clean_residential_street_2
    rename_column :households, :clean_city, :clean_residential_city
    rename_column :households, :clean_zip_code, :clean_residential_zip_code

    add_column :households, :clean_mailing_street, :string
    add_column :households, :clean_mailing_street_2, :string
    add_column :households, :clean_mailing_city, :string
    add_column :households, :clean_mailing_zip_code, :string

    rename_column :households, :cleaned_address, :cleaned_addresses
  end
end
