class UserTokenController < Knock::AuthTokenController
  # # no sé para qué
  skip_before_action :verify_authenticity_token, raise: false
  # def myverify
  #   puts "----------"
  #   puts params
  #   puts "----------"
  #   puts Knock.token_secret_signature_key
  #   puts "----------"
  #   puts params[:token]
  #   puts "----------"
  #   puts JWT.decode params[:token], Rails.application.credentials.fetch(:secret_key_base), true, { algorithm: 'HS256' }
  #   puts "----------"
  #   # params.permit(:token)
  #   render json: params
  # end
end
