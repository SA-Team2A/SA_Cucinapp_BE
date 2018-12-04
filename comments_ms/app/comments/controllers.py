from flask_restful import Resource, reqparse, abort
from flask import request, jsonify, make_response
from app.comments.models import Comment
from app.api import api

parser = reqparse.RequestParser(bundle_errors=True)
parser.add_argument('user_id', type=int, required=True)
parser.add_argument('recipe_id', required=True)
parser.add_argument('comment', required=True)
parser.add_argument('created_date', required=True)

putParser = reqparse.RequestParser()
putParser.add_argument('comment', required=True)

getBy = reqparse.RequestParser()
getBy.add_argument('user_id', store_missing = False, location='args', type=int)
getBy.add_argument('recipe_id', store_missing = False, location='args')

class CommentsController(Resource):
    def get(self):
        args = getBy.parse_args()

        if args:
            if 'user_id' in args.keys() and 'recipe_id' in args.keys():
                comments = Comment.query.filter(Comment.user_id == args['user_id'], Comment.recipe_id == args['recipe_id'])
            elif 'user_id' in args.keys():
                comments = Comment.query.filter(Comment.user_id == args['user_id'])
            elif 'recipe_id' in args.keys():
                comments = Comment.query.filter(Comment.recipe_id == args['recipe_id'])
        else:
            comments = Comment.query.all()

        response = []

        if comments:
            for i in comments:
                response.append({"_id": str(i.mongo_id),
                                 "user_id":  i.user_id,
                                 "recipe_id": i.recipe_id,
                                 "comment": i.comment,
                                 "created_date": i.created_date })

        res =  jsonify({'comments': response})
        return make_response(res, 200)

    def post(self):
        args = parser.parse_args()
        comment = Comment(user_id = args['user_id'],
                          recipe_id = args['recipe_id'],
                          comment = args['comment'],
                          created_date = args['created_date'])
        comment.save()
        res = jsonify({"_id": str(comment.mongo_id),
                         "user_id":  comment.user_id,
                         "recipe_id": comment.recipe_id,
                         "comment": comment.comment,
                         "created_date": comment.created_date })
        return make_response(res, 201)

class CommentController(Resource):
    def get(self, id):
        comment = Comment.query.get(id)
        if comment:
            res = jsonify({"_id": str(comment.mongo_id),
                             "user_id":  comment.user_id,
                             "recipe_id": comment.recipe_id,
                             "comment": comment.comment,
                             "created_date": comment.created_date })
            return make_response(res, 200)
        abort(404)

    def put(self, id):
        args = putParser.parse_args()
        comment = Comment.query.get(id)

        if comment:
            comment.comment = args['comment']
            comment.save()
            res = jsonify({"_id": str(comment.mongo_id),
                             "user_id":  comment.user_id,
                             "recipe_id": comment.recipe_id,
                             "comment": comment.comment,
                             "created_date": comment.created_date })
            return make_response(res, 200)
        abort(404)

    def delete(self, id):
        comment = Comment.query.get(id)
        if comment:
            comment.remove()
            res = jsonify({"_id": str(comment.mongo_id),
                             "user_id":  comment.user_id,
                             "recipe_id": comment.recipe_id,
                             "comment": comment.comment,
                             "created_date": comment.created_date })
            return make_response(res, 200)
        abort(404)
