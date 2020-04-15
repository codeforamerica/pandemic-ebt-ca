class AddMailingAddressToHousehold < ActiveRecord::Migration[6.0]
  def change
    add_column :households, :mailing_street, :string
    add_column :households, :mailing_city, :string
    add_column :households, :mailing_zip_code, :string
  end
end
