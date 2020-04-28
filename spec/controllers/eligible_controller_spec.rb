require 'rails_helper'

RSpec.describe EligibleController do
  it_behaves_like 'form controller base behavior', Household.create({ is_eligible: :yes })
end
