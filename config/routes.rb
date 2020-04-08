Rails.application.routes.draw do
  root "pages#index"
  get "/how" => "pages#how", as: "how"
  get "/eligible" => "pages#eligible", as: "eligible"
  get "/received_card" => "pages#received_card", as: "received_card"
  get "/sorry" => "pages#sorry", as: "sorry"
  get "/meal_eligibility" => "pages#meal_eligibility", as: "meal_eligibility"
  resource :households, only: [:create]

  mount Cfa::Styleguide::Engine => "/cfa"
end
