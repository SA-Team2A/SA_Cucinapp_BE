Rails.application.routes.draw do
  resources :followers
  post '/user_token' => 'user_token#create'
  post '/myverify' => 'users#myverify'
  resources :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
