Rails.application.routes.draw do
  get "/users/searchOne" => "users#searchOne"
  get "/users/searchMany" => "users#searchMany"
  resources :users, except: :create
  post "/users/addFollower" => "users#addFollower"
  post "/users/removeFollower" => "users#removeFollower"
  post "/login" => "ldap#login"
  post "/create" => "ldap#create"
  wash_out :soap_users
end
