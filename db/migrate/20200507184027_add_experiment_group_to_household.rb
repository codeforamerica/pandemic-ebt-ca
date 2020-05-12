class AddExperimentGroupToHousehold < ActiveRecord::Migration[6.0]
  def change
    add_column :households, :experiment_group, :integer, default: 0
  end
end
