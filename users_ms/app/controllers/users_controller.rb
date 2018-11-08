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

  # POST /users
  def create
    if !params[:user] || params[:user].empty?
    # if params[:user].empty?
      error = {
        info: "User object not found or the value is empty",
        status: 400,
        message: "BAD REQUEST"
      }
      return render json: error, status: :bad_request
    end

    user = User.new(user_params)
    # puts params
    # puts params[:user_img]
    # puts params[:user_img]? true : false
    # puts params[:user_img]? "mytrue" : user.user_img = nil

    # File.open(params[:user_img]) do |f|
    #   user.user_img = f
    # end
    # user.user_img = params[:user_img]
    # puts user.user_img
    # puts user.user_img.file
    # puts user.user_img.file.nil?
    # user.user_img = new File(user_params[:src_user_img])
    if user.save
      render json: user, status: :created, location: user
    else
      render json: { message: "UNPROCESSABLE ENTITY", status: 422 } , status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if !params[:user] || params[:user].empty?
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

  def login
    if !params[:email]
      error = {
        info: "User email not found or the value is empty",
        status: 400,
        message: "BAD REQUEST"
      }
      return render json: error, status: :bad_request
    end
    if !params[:password]
      error = {
        info: "User password not found or the value is empty",
        status: 400,
        message: "BAD REQUEST"
      }
      return render json: error, status: :bad_request
    end

    user_id = nil
    @user = User.getByEmail(params[:email])
    puts @user
    if !@user
      error = {
        info: "Email doesn't match with any user",
        status: 404,
        message: "NOT FOUND"
      }
      return render json: error, status: :not_found
    end

    if @user.authenticate(params[:password])
      return render json: { user_id: @user.id }, status: :ok
    end
    error = {
      info: "Password doesn't match",
      status: 406,
      message: "NOT ACCEPTABLE"
    }
    render json: error, status: :not_acceptable
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

    # Only allow a trusted parameter "white list" through.
    def user_params
      params.require(:user).permit(:username, :email, :password, :password_confirmation, :user_img)
    end
end
