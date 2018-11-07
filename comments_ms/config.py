import os

class DevelopmentConfig(object):
    # DEBUG = True
    BUNDLE_ERRORS = True
    MONGOALCHEMY_DATABASE = "comments"
    MONGOALCHEMY_CONNECTION_STRING = os.getenv("MONGO_URI", "mongodb://localhost:27017/comments")
