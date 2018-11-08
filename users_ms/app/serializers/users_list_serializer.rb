class UsersListSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :user_img
end
