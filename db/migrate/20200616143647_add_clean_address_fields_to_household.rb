class AddCleanAddressFieldsToHousehold < ActiveRecord::Migration[6.0]
  def change
    add_column :households, :clean_street_1, :string
    add_column :households, :clean_street_2, :string
    add_column :households, :clean_city, :string
    add_column :households, :clean_zip_code, :string
    add_column :households, :cleaned_address, :boolean, default: false
    add_index :households, :cleaned_address
  end
end
