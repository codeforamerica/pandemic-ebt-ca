class RemoveNullConstraintsOnChildren < ActiveRecord::Migration[6.0]
  def change
    change_column_null(:children, :first_name, true)
    change_column_null(:children, :last_name, true)
    change_column_null(:children, :dob, true)
    change_column_null(:children, :household_id, true)
    change_column_null(:children, :created_at, true)
    change_column_null(:children, :updated_at, true)
    change_column_null(:children, :suid, true)
    change_column_null(:children, :school_type, true)
  end
end
