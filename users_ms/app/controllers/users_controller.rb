class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all
    render json: @users, each_serializer: UsersListSerializer
  end

  # GET /users/1
  def show
    if !@user
      error = {
        info: "User with id #{params[:id]} not found",
        status: 404,
        message: "NOT FOUND"
      }
      return render json: error, status: :not_found
    end
    render json: @user, status: :ok
  end

  # PATCH/PUT /users/1
  def update
    if params[:user].empty?
      error = {
        info: "User object not found or the value is empty",
        status: 400,
        message: "BAD REQUEST"
      }
      return render json: error, status: :bad_request
    end
    if !@user
      error = {
        info: "User with id #{params[:id]} not found",
        status: 404,
        message: "NOT FOUND"
      }
      return render json: error, status: :not_found
    end
    if @user.update(user_params)
      render json: @user
    else
      render json: { message: "UNPROCESSABLE ENTITY", status: 422 }, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    if !@user
      error = {
        info: "User with id #{params[:id]} not found",
        status: 404,
        message: "NOT FOUND"
      }
      return render json: error, status: :not_found
    end
    @user.destroy
    render json: @user, status: :ok
  end

  def addFollower
    user = User.find_by_id(params[:user_id])
    follower = User.find_by_id(params[:follower_id])
    if !user
      error = {
        info: "User with id #{params[:id]} not found",
        status: 404,
        message: "NOT FOUND"
      }
      return render json: error, status: :not_found
    end
    if !follower
      error = {
        info: "User with id #{params[:follower_id]} not found",
        status: 404,
        message: "NOT FOUND"
      }
      return render json: error, status: :not_found
    end

    if !user.followers.include? follower
      user.followers.push(follower)
    end
    render json: user, status: :accepted
  end

  def removeFollower
    user = User.find_by_id(params[:user_id])
    follower = User.find_by_id(params[:follower_id])
    if !user
      error = {
        info: "User with id #{params[:id]} not found",
        status: 404,
        message: "NOT FOUND"
      }
      return render json: error, status: :not_found
    end
    if !follower
      error = {
        info: "User with id #{params[:follower_id]} not found",
        status: 404,
        message: "NOT FOUND"
      }
      return render json: error, status: :not_found
    end

    if user.followers.include? follower
      user.followers.delete(follower)
    end
    render json: user, status: :accepted
  end

  def searchOne
    email = params[:email]

    if email
      user = User.getByEmail(email)
      render json: user, status: :ok
    else
      render json: { status: 400, message: "BAD REQUEST" }, status: :bad_request
    end
  end

  def searchMany
    username = params[:username]

    if username
      users = User.getByUsernameLike(username)
      render json: users, each_serializer: UsersListSerializer, status: :ok
    else
      render json: { status: 400, message: "BAD REQUEST" }, status: :bad_request
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_user
      # if params[:user].empty?
      #   return render json: { message: "User object not found or the value is empty", code: 400 }, status: :bad_request
      # end
      @user = User.find_by_id(params[:id])
    end
end
