require 'net/ldap'

class LdapController < ApplicationController

  def initialize
    @ou_users_created = false
    super
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

    ldap = connect_user params[:email], params[:password]

    if ldap != false
      user_id = nil
      user = User.getByEmail(params[:email])
      if !user
        error = {
          info: "Email doesn't match with any user in db",
          status: 404,
          message: "NOT FOUND"
        }
        return render json: error, status: :not_found
      end

      if user.authenticate(params[:password])
        return render json: { user_id: user.id }, status: :ok
      end

      error = {
        info: "Password doesn't match",
        status: 406,
        message: "NOT ACCEPTABLE"
      }
      render json: error, status: :not_acceptable

    else
      error = {
        info: "Email doesn't match with any user in LDAP server",
        status: 404,
        message: "NOT FOUND"
      }
      return render json: error, status: :not_found
    end
  end

  def create

    if params[:user].empty?
      error = {
        info: "User object not found or the value is empty",
        status: 400,
        message: "BAD REQUEST"
      }
      return render json: error, status: :bad_request
    end

    user = User.new(user_params)
    ldap = connect_admin

    if ldap != false
      if @ou_users_created == false
        ou = ldap.search(
          base: 'dc=cucinapp,dc=com',
          filter: Net::LDAP::Filter.eq("ou", "users"),
          attributes: ['ou'],
          return_result: true
        )
        if ou.size <= 0
          ldap.add(dn: "ou=users,dc=cucinapp,dc=com", attributes: {
            ou: 'users',
            objectClass: ['top', 'organizationalUnit']
          })
        end
        @ou_users_created = true
      end
    end

    if user.save and ldap != false
      ldap.add(dn: "uid=#{user.email},ou=users,dc=cucinapp,dc=com", attributes: {
        uid: user.email,
        objectClass: ['top', 'simpleSecurityObject', 'account'],
        userPassword: Net::LDAP::Password.generate(:md5, params[:user][:password])
      })
      render json: user, status: :created, location: user
    else
      render json: { message: "UNPROCESSABLE ENTITY", status: 422 }, status: :unprocessable_entity
    end
  end

  private

  def connect_admin
    connect 'cn=admin', ENV['LDAP_ADMIN_PASSWORD']
  end

  def connect_user username, password
    connect "uid=#{username},ou=users", password
  end

  def connect dn, password
    ldap = Net::LDAP.new
    ldap.host = ENV['LDAP_HOST']
    ldap.port = ENV['LDAP_PORT']
    ldap.auth "#{dn},dc=cucinapp,dc=com", password
    if ldap.bind
      ldap
    else
      false
    end
  end

  def user_params
    params.require(:user).permit(:username, :email, :password, :password_confirmation)
  end

end
