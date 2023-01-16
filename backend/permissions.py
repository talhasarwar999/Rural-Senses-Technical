from flask import Flask, request, jsonify
from flask_jwt_extended import get_jwt_identity, verify_jwt_in_request
from functools import wraps
from models import *

def check_role_and_authorize(user_role):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()   # verify jwt exist
            current_user = get_jwt_identity()   # get current user from JWT
            user_from_db = User.objects(username=current_user).first()    # check if user exist
            if user_from_db and user_from_db.role == user_role:  # check if role exist
                return fn(*args, **kwargs)
            else:
                return jsonify(msg="bad request!"), 404
        return decorator
    return wrapper