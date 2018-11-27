class SoapUsersController < ApplicationController

  class UserListSOAP < WashOut::Type
    map simple_user: {
      id: :integer,
      username: :string,
      email: :string
    }
  end

  class UserSOAP < WashOut::Type
    map user: {
      id: :integer,
      username: :string,
      email: :string,
      followers: [UserListSOAP]
    }
  end

  soap_service namespace: 'urn:WashOutUsers', camelize_wsdl: :lower
  soap_action 'getUser', args: { userId: :integer }, return: UserSOAP

  def getUser
    puts "\n\n\n #{params[:userId]} \n\n\n"
    @user = User.find_by_id(params[:userId])
    followers = @user.followers.as_json.map{ |f| {simple_user: f} }
    user_build = @user.as_json.merge(followers: followers)
    raise SOAPError, "User with id #{params[:userId]} not found" if !@user
    render soap: { user: user_build }
  end
end
