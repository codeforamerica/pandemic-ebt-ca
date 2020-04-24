class RemoveSuidFromHouseholdAndAddToChildren < ActiveRecord::Migration[6.0]
  def change
    remove_column :households, :suid, :string
    add_column :children, :suid, :string
  end
end
