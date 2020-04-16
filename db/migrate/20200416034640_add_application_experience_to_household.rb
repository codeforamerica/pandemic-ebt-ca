class AddApplicationExperienceToHousehold < ActiveRecord::Migration[6.0]
  def change
    add_column :households, :application_experience, :integer, default: 0
  end
end
