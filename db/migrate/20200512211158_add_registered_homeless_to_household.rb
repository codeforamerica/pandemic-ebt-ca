class AddRegisteredHomelessToHousehold < ActiveRecord::Migration[6.0]
  def change
    add_column :households, :registered_homeless, :integer, default: 0
  end
end
