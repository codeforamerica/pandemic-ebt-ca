class AddIndexToSuid < ActiveRecord::Migration[6.0]
  def change
    add_index :children, :suid, unique: true
  end
end
