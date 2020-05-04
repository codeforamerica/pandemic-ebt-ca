class AddSchoolTypeToChildren < ActiveRecord::Migration[6.0]
  def change
    add_column :children, :school_type, :integer, limit: 2
  end
end
