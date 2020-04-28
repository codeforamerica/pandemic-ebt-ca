class AddResidentialAddressToHousehold < ActiveRecord::Migration[6.0]
  def change
    change_table :households, bulk: true do |t|
      t.string :residential_street
      t.string :residential_city
      t.string :residential_zip_code
      t.string :has_mailing_address, default: 0
    end
  end
end
