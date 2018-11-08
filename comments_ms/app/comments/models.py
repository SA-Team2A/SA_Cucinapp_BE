from app.api import db
from datetime import datetime, timezone

def utc_to_local(utc_dt):
    return utc_dt.replace(tzinfo=timezone.utc).astimezone(tz=None)

class Comment(db.Document):
    user_id = db.IntField()
    recipe_id = db.StringField()
    comment = db.StringField()
    created_date = db.StringField()
