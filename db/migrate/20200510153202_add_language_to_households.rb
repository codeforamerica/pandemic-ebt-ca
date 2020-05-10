class AddLanguageToHouseholds < ActiveRecord::Migration[6.0]
  def change
    add_column :households, :language, :string, limit: 2, null: false
  end
end
