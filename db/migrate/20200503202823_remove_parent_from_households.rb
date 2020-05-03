class RemoveParentFromHouseholds < ActiveRecord::Migration[6.0]
  def change
    remove_column :households, :parent_first_name, :string
    remove_column :households, :parent_last_name, :string
  end
end
