class User < ApplicationRecord

  has_secure_password

  def to_token_payload
    {
        sub: id,
        username: username,
        email: email
    }
  end

  validates_length_of :password, maximum: 72, minimum: 6, allow_nil: false, allow_blank: false
  # validates_length_of :password_digest, maximum: 72, minimum: 6, allow_nil: false, allow_blank: false

  validates_presence_of :email
  validates_presence_of :username
  validates_uniqueness_of :email
  validates_uniqueness_of :username


  # follower_followers "names" the Follower join table for accessing through the follower association
  has_many :follower_followers, foreign_key: :followee_id, class_name: "Follower"
  # source: :follower matches with the belong_to :follower identification in the Follower model
  has_many :followers, through: :follower_followers, source: :follower

  # followee_followers "names" the Follower join table for accessing through the followee association
  has_many :followee_followers, foreign_key: :follower_id, class_name: "Follower"
  # source: :followee matches with the belong_to :followee identification in the Follower model
  has_many :followees, through: :followee_followers, source: :followee
end
