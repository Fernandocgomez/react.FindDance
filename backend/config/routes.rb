Rails.application.routes.draw do
  resources :visiteds
  resources :goings
  resources :questions
  resources :events
  resources :users
  post '/login', to: 'auth#create'
  get '/states', to: 'events#get_states'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
