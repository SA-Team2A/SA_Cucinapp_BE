class UserTokenController < Knock::AuthTokenController
  # # no sé para qué
  skip_before_action :verify_authenticity_token, raise: false
end
