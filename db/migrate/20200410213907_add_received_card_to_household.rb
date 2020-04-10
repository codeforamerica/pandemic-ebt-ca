class AddReceivedCardToHousehold < ActiveRecord::Migration[6.0]
  def change
    add_column :households, :received_card, :integer, default: 0
  end
end
