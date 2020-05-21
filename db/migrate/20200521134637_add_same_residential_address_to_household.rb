class AddSameResidentialAddressToHousehold < ActiveRecord::Migration[6.0]
  def change
    add_column :households, :same_residential_address, :integer, default: 0
  end
end
