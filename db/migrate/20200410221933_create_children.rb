class CreateChildren < ActiveRecord::Migration[6.0]
  def change
    create_table :children do |t|
      t.string :first_name
      t.string :last_name
      t.date :dob
      t.belongs_to :household
      t.timestamps
    end
  end
end
