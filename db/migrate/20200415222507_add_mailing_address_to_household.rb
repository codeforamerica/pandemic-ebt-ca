class AddMailingAddressToHousehold < ActiveRecord::Migration[6.0]
  def change
    change_table :households, bulk: true do |t|
      t.string :mailing_street
      t.string :mailing_city
      t.string :mailing_zip_code
    end
  end
end
