class UsersController < ApplicationController
  before_action :set_user, only: [:show, :update, :destroy]

  # GET /users
  def index
    @users = User.all
    render json: @users
  end

  # GET /users/1
  def show
    if !@user
      return render json: { message: "User with id #{params[:id]} not found", code: 404 }, status: :not_found
    end
    render json: @user, status: :ok
  end

  # POST /users
  def create
    if params[:user].empty?
      return render json: { message: "User object not found or the value is empty", code: 400 }, status: :bad_request
    end
    user = User.new(user_params)
    if user.save
      render json: user, status: :created, location: user
    else
      puts json: user.errors
      render json: { message: user.errors.messages.to_s, code: 422 } , status: :unprocessable_entity
    end
  end

  # PATCH/PUT /users/1
  def update
    if params[:user].empty?
      return render json: { message: "User object not found or the value is empty", code: 400 }, status: :bad_request
    end
    if !@user
      return render json: { message: "User with id #{params[:id]} not found", code: 404 }, status: :not_found
    end
    if @user.update(user_params)
      render json: @user
    else
      render json: { message: user.errors.messages.to_s, code: 422 }, status: :unprocessable_entity
    end
  end

  # DELETE /users/1
  def destroy
    if !@user
      return render json: { message: "User with id #{params[:id]} not found", code: 404 }, status: :not_found
    end
    @user.destroy
    render json: @user, status: :ok
  end

  def login
    if !params[:email]
      return render json: { message: "User email not found or the value is empty", code: 400 }, status: :bad_request
    end
    if !params[:password]
      return render json: { message: "User password not found or the value is empty", code: 400 }, status: :bad_request
    end

    user_id = nil
    @user = User.getByEmail(params[:email])
    puts @user
    if !@user
      return render json: { message: "Email doesn't match with any user", code: 404 }, status: :not_found
    end

    if @user.authenticate(params[:password])
      return render json: { user_id: @user.id }, status: :ok
    end
    render json: { message: "Password doesn't match", code: 406 }, status: :not_acceptable
  end

  def addFollower
    user = User.find_by_id(params[:user_id])
    follower = User.find_by_id(params[:follower_id])
    if !user
      return render json: { message: "User with id #{params[:user_id]} not found", code: 404 }, status: :not_found
    end
    if !follower
      return render json: { message: "User with id #{params[:follower_id]} not found", code: 404 }, status: :not_found
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
      return render json: { message: "User with id #{params[:user_id]} not found", code: 404 }, status: :not_found
    end
    if !follower
      return render json: { message: "User with id #{params[:follower_id]} not found", code: 404 }, status: :not_found
    end

    if user.followers.include? follower
      user.followers.delete(follower)
    end
    render json: user, status: :accepted
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
      params.require(:user).permit(:username, :email, :password, :password_confirmation)
    end
end
