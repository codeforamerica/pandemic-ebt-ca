class AddSuidToHouseholds < ActiveRecord::Migration[6.0]
  def change
    add_column :households, :suid, :string
  end
end
