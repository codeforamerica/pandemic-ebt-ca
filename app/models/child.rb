class Child < ApplicationRecord
  belongs_to :household

  enum school_type: {
    public_school: 0,
    private_school: 1
  }
end
