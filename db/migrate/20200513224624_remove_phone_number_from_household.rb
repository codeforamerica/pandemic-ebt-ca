class RemovePhoneNumberFromHousehold < ActiveRecord::Migration[6.0]
  def change
    remove_column :households, :phone_number, :string
  end
end
