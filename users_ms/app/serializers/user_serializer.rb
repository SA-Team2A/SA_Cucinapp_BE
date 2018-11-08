class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :user_img
  has_many :followers
end
