Rails.application.routes.draw do
  root "pages#index"
  get "/how" => "pages#how", as: "how"

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

  delete "/steps/children/:id" => "children#destroy", as: "remove_child"

  mount Cfa::Styleguide::Engine => "/cfa"
end
