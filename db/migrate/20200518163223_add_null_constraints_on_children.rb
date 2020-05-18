class AddNullConstraintsOnChildren < ActiveRecord::Migration[6.0]
  def change
    change_column_null(:children, :first_name, false)
    change_column_null(:children, :last_name, false)
    change_column_null(:children, :dob, false)
    change_column_null(:children, :household_id, false)
    change_column_null(:children, :created_at, false)
    change_column_null(:children, :updated_at, false)
    change_column_null(:children, :suid, false)
    change_column_null(:children, :school_type, false)
  end
end
