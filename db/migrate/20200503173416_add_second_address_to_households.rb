class AddSecondAddressToHouseholds < ActiveRecord::Migration[6.0]
  def change
    add_column :households, :residential_street_2, :string, length: 128
    add_column :households, :mailing_street_2, :string, length: 128
  end
end
