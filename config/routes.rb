Rails.application.routes.draw do
  namespace :metrics do
    resources :raids
  end
  namespace :metrics do
    resources :deep_dungeons
  end
  namespace :metrics do
    resources :trials
  end
  namespace :metrics do
    resources :dungeons
  end
  namespace :metrics do
    resources :roulettes, only: [] do
      collection do
        get :roulette_xp
        get :instance_xp
        get :total_xp
        get :instance_time
        get :roulette_calculator
      end
    end
  end
  resources :instance_entries
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root 'instance_entries#new'
end
