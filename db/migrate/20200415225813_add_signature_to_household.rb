class AddSignatureToHousehold < ActiveRecord::Migration[6.0]
  def change
    add_column :households, :signature, :string
    add_column :households, :submitted_at, :datetime
  end
end
