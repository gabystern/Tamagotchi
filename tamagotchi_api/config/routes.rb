Rails.application.routes.draw do

  namespace :api do
  	namespace :v1 do
  		resources :pets, only: [:index, :create, :show]
      patch '/pets/:id/feed', to: 'pets#feed'
      patch '/pets/:id/sleep', to: 'pets#sleep'
      patch '/pets/:id/rubiks', to: 'pets#rubiks'
      patch '/pets/:id/jumprope', to: 'pets#jumprope'
      patch '/pets/:id/fidgetspinner', to: 'pets#fidgetspinner'
      patch '/pets/:id/decrement', to: 'pets#decrement'
  	end
  end

   namespace :api do
  	namespace :v1 do
  		resources :toys, only: [:index, :show]
  	end
  end

   namespace :api do
  	namespace :v1 do
  		resources :settings, only: [:index]
  	end
  end

end
