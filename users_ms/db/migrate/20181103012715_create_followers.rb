class CreateFollowers < ActiveRecord::Migration[5.2]
  def change
    create_table :followers, id: false do |t|
      t.integer :user_id
      t.integer :follower_id
    end
  end
end
