Rails.application.routes.draw do

  namespace :api do
  	namespace :v1 do
  		resources :pets, only: [:index, :create]
  	end
  end

   namespace :api do
  	namespace :v1 do
  		resources :toys, only: [:index]
  	end
  end

   namespace :api do
  	namespace :v1 do
  		resources :settings, only: [:index]
  	end
  end

end
