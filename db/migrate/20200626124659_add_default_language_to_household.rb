class AddDefaultLanguageToHousehold < ActiveRecord::Migration[6.0]
  def change
    Household.where(language: nil).update_all language: 'en'
    change_column :households, :language, :string, limit: 3, null: false, default: 'en'
  end
end
