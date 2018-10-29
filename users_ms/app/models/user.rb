class User < ApplicationRecord
  has_secure_password

  def to_token_payload
    {
        sub: id,
        username: username
    }
  end

  validates_length_of :password, maximum: 72, minimum: 6, allow_nil: false, allow_blank: false
  # validates_length_of :password_digest, maximum: 72, minimum: 6, allow_nil: false, allow_blank: false

  validates_presence_of :email
  validates_presence_of :username
  validates_uniqueness_of :email
  validates_uniqueness_of :username
end
