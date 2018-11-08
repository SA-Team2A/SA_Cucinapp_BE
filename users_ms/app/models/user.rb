# require 'carrierwave/orm/activerecord'
# require 'bcrypt'

class User < ApplicationRecord
  has_secure_password
  # mount_uploader :user_img, "Aqui va otra cosa"
  # include BCrypt

  has_and_belongs_to_many :followers,
                          class_name: 'User',
                          join_table: 'followers',
                          association_foreign_key: 'follower_id'

  class EmailValidator < ActiveModel::Validator
    def validate(record)
      unless record.email =~ /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i
        record.errors[:email] << 'Not an email'
      end
    end
  end

  validates :username, presence: true
  validates :email, presence: true
  validates :email, uniqueness: {
    case_sensitive: false,
  }
  validates :username, uniqueness: {
    case_sensitive: false,
  }

  validates :password, presence: true, if: :password
  validates :password, length: {minimum: 8}, if: :password
  validates :password, length: {maximum: 20}, if: :password
  validates_with EmailValidator

  def self.getByUsernameLike(username)
    # Pilas con SQL injection -> pilas con el ;
    self.where("username ilike ?", '%' + username + '%')
  end

  def self.getByEmail(email)
    self.where(email: email)[0]
  end

end
