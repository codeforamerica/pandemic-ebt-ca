class HouseholdsController < ApplicationController
  def create
    household = Household.new(household_params)
    if household.is_eligible_no?
      redirect_to sorry_path
    elsif household.is_eligible_dont_know?
      redirect_to meal_eligibility_path
    else
      household.save!
      redirect_to received_card_path
    end
  end

  def household_params
    params.require(:form).permit(:is_eligible)
  end
end