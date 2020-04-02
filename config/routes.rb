Rails.application.routes.draw do
  root "home#index"

  mount Cfa::Styleguide::Engine => "/cfa"
end
