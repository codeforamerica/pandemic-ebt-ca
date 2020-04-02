Rails.application.routes.draw do
  root "pages#index"
  get "/how" => "pages#how", as: "how"

  mount Cfa::Styleguide::Engine => "/cfa"
end
