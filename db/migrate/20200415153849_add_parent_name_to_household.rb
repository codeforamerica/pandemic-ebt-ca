class AddParentNameToHousehold < ActiveRecord::Migration[6.0]
  def change
    change_table :households, bulk: true do |t|
      t.string :parent_first_name
      t.string :parent_last_name
    end
  end
end
