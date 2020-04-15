class AddResidentialAddressToHousehold < ActiveRecord::Migration[6.0]
  def change
    add_column :households, :residential_street, :string
    add_column :households, :residential_city, :string
    add_column :households, :residential_zip_code, :string
    add_column :households, :has_mailing_address, :integer, default: 0
  end
end
