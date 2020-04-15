class AddParentNameToHousehold < ActiveRecord::Migration[6.0]
  def change
    add_column :households, :parent_first_name, :string
    add_column :households, :parent_last_name, :string
  end
end
