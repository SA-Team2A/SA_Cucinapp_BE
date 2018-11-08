Rails.application.routes.draw do
  get "/users/searchOne" => "users#searchOne"
  get "/users/searchMany" => "users#searchMany"
  resources :users
  post "login" => "users#login"
  get "/users/:user_id/addfollower/:follower_id" => "users#addFollower"
  get "/users/:user_id/removefollower/:follower_id" => "users#removeFollower"
end
