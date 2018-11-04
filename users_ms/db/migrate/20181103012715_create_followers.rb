class CreateFollowers < ActiveRecord::Migration[5.2]
  def change
    create_table :followers, id: false do |t|
      t.integer :user_id, null: false
      t.integer :follower_id, null: false
    end
  end
end
