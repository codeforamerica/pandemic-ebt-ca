Rails.application.routes.draw do
  root "pages#index"
  get "/how" => "pages#how", as: "how"
  get "/edit" => "pages#edit", as: "edit"
  get "/meal_eligibility" => "pages#meal_eligibility", as: "meal_eligibility"

  resources :steps, controller: :forms, only: (Rails.env.production? ? %i[show] : %i[show index]) do
    collection do
      FormNavigation.controllers.uniq.each do |controller_class|
        { get: :edit, put: :update }.each do |method, action|
          match "/#{controller_class.to_param}",
                action: action,
                controller: controller_class.controller_path,
                via: method
        end
      end
    end
  end

  mount Cfa::Styleguide::Engine => "/cfa"
end
