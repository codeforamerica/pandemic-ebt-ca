class AddIndexToSubmittedAt < ActiveRecord::Migration[6.0]
  def change
    add_index :households, :submitted_at
    change_column_null :children, :created_at, false
    change_column_null :children, :updated_at, false
  end
end
