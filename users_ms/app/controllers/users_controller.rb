class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all

    render json: @users
  end

  def login
    user_id = nil
    @user = User.getByEmail(params[:email])
    if @user.authenticate(params[:password])
      user_id = @user.id
    end

    render json: { user_id: user_id }, status: :ok
  end

  def addFollower
    user = User.find(params[:user_id])
    follower = User.find(params[:follower_id])
    if !(user && follower)
      return render status: :not_found
    end

    if !user.followers.include? follower
      user.followers.push(follower)
    end
    render json: user, status: :accepted
  end

  def removeFollower
    user = User.find(params[:user_id])
    follower = User.find(params[:follower_id])
    if !(user && follower)
      return render status: :not_found
    end

    if user.followers.include? follower
      user.followers.delete(follower)
    end
    render json: user, status: :accepted
  end

  # GET /users/1
  def show
    render json: @user
  end

  # POST /users
  def create
    user = User.new(user_params)

    if user.save
      render json: user, status: :created, location: user
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    @user.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      @user = User.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation)
    end
end
