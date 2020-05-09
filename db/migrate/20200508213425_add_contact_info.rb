class AddContactInfo < ActiveRecord::Migration[6.0]
  def change
    add_column :households, :email_address, :string
    add_column :households, :phone_number, :string, length: 10
  end
end
