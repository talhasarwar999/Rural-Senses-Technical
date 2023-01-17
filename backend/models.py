import mongoengine as me




class User(me.Document):
    username = me.StringField(required=True)
    password = me.StringField(required=True)
    role = me.StringField(required=True)
    communities = me.ListField(me.StringField())


class Feedback(me.Document):
    user = me.ReferenceField(User)
    community = me.StringField()
    community_size = me.IntField()
    description = me.StringField()
    age = me.IntField()
    classification = me.StringField()


class Message(me.Document):
    sender = me.StringField()
    community = me.StringField()
    message = me.StringField()