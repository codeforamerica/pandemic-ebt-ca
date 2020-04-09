class CreateHouseholds < ActiveRecord::Migration[6.0]
  def change
    create_table :eligible do |t|
      t.integer :is_eligible, default: 0
      t.timestamps
    end
  end
end
