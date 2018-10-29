from flask import Flask
from flask_restful import Api
from config import DevelopmentConfig
from flask_mongoalchemy import MongoAlchemy
from app.error import errors


app = Flask(__name__)
app.config.from_object(DevelopmentConfig)
db = MongoAlchemy(app)
api = Api(app, errors=errors)

from app.comments.controllers import CommentController, CommentsController

api.add_resource(CommentsController, '/comments')
api.add_resource(CommentController, '/comments/<string:id>')
