# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_06_16_143647) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "children", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.date "dob"
    t.bigint "household_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "suid"
    t.integer "school_type", limit: 2
    t.index ["household_id"], name: "index_children_on_household_id"
    t.index ["suid"], name: "index_children_on_suid", unique: true
  end

  create_table "households", force: :cascade do |t|
    t.integer "is_eligible", default: 0
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "received_card", default: 0
    t.string "residential_street"
    t.string "residential_city"
    t.string "residential_zip_code"
    t.integer "has_mailing_address", default: 0
    t.string "mailing_street"
    t.string "mailing_city"
    t.string "mailing_zip_code"
    t.string "signature"
    t.datetime "submitted_at"
    t.integer "application_experience", default: 0
    t.string "residential_street_2"
    t.string "mailing_street_2"
    t.integer "experiment_group", default: 0
    t.string "email_address"
    t.string "language", limit: 2
    t.integer "registered_homeless", default: 0
    t.integer "same_residential_address", default: 0
    t.string "clean_street_1"
    t.string "clean_street_2"
    t.string "clean_city"
    t.string "clean_zip_code"
    t.boolean "cleaned_address", default: false
    t.index ["cleaned_address"], name: "index_households_on_cleaned_address"
    t.index ["submitted_at"], name: "index_households_on_submitted_at"
  end

end
