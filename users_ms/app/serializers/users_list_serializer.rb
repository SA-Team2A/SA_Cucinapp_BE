class UsersListSerializer < ActiveModel::Serializer
  attributes :id, :username, :email
end
