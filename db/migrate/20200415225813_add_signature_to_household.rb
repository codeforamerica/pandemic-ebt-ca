class AddSignatureToHousehold < ActiveRecord::Migration[6.0]
  def change
    change_table :households, bulk: true do |t|
      t.string :signature
      t.datetime :submitted_at
    end
  end
end
