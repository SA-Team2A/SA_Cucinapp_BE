errors = {
    'BadRequest': {
        'status': 400,
        'message': "BAD REQUEST",
        'info': "The request contains incorrect syntax and should not be repeated."
    },
    'NotFound': {
        'status': 404,
        'message': "NOT FOUND",
        'info': "The resource does not exist.",
    },
    'UnprocessableEntity': {
        'status': 422,
        'message': "UNPROCESSABLE ENTITY",
        'info': "The request is well formed but it was impossible to follow it due to semantic errors."
    },
    'MethodNotAllowed': {
        'status': 405,
        'message': "METHOD NOT ALLOWED",
        'info': "The method is not allowed for the requested URL."
    },
    'InternalServerError': {
        'status': 500,
        'message': "INTERNAL SERVER ERROR"
    }
}
