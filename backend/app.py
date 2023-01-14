from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request
from flask import Flask, request, jsonify, make_response
from werkzeug.utils import secure_filename
from flask_pymongo import PyMongo
from flask_cors import CORS
from functools import wraps
import hashlib
import os
import pandas as pd
import csv


# Flask app configurations
app = Flask(__name__)
app.config['SECRET_KEY'] = "e71e95b221e9c960889260960a244de2f0a9c7a8"
app.config['MONGO_URI'] = "mongodb+srv://talhasarwa999:ali2061989@cluster0.sy4ye0l.mongodb.net/TestMongo?retryWrites=true&w=majority"
mongo_client = PyMongo(app)
db = mongo_client.db
jwt = JWTManager(app)
CORS(app)




@app.route('/user-signin', methods=["POST"])
def user_signin():
    login_details = request.get_json()  # store the json body request
    user_from_db = db.users.find_one({'username': login_details['username']})  # search for user in database
    if user_from_db:
        encrpted_password = hashlib.sha256(login_details['password'].encode("utf-8")).hexdigest()

        if encrpted_password == user_from_db['password']:
            if user_from_db['role'] == 'Admin':
                access_token = create_access_token(identity=user_from_db['username'])  # create jwt token
                role = 'Admin'
                return jsonify(access_token=access_token, role=role)

            elif user_from_db['role'] == 'CommunitySocialWorker':
                access_token = create_access_token(identity=user_from_db['username'])  # create jwt token
                role = 'CommunitySocialWorker'
                return jsonify(access_token=access_token, role=role)

            elif user_from_db['role'] == 'PublicOfficial':
                access_token = create_access_token(identity=user_from_db['username'])  # create jwt token
                role = 'PublicOfficial'
                return jsonify(access_token=access_token, role=role)

    return jsonify({'msg': 'The username or password is incorrect'})



def check_role_and_authorize(user_role):
    def wrapper(fn):
        @wraps(fn)
        def decorator(*args, **kwargs):
            verify_jwt_in_request()
            current_user = get_jwt_identity()
            user_from_db = db.users.find_one({'username': current_user})
            if user_from_db and user_from_db['role'] == user_role:
                return fn(*args, **kwargs)
            else:
                return jsonify(msg="bad request!"), 404
        return decorator
    return wrapper



@app.route("/admin-dashboard", methods=["GET"])
@jwt_required()
@check_role_and_authorize('Admin')
def admin_dashboard():
    return jsonify({'msg': 'Profile Found Successfully Admin'}), 200



@app.route("/community-dashboard", methods=["GET"])
@jwt_required()
@check_role_and_authorize('CommunitySocialWorker')
def community_dashboard():
    return jsonify({'msg': 'Profile Found Successfully Community Social Worker'}), 200



@app.route("/public-official-dashboard", methods=["GET"])
@jwt_required()
@check_role_and_authorize('PublicOfficial')
def public_official_dashboard():
    return jsonify({'msg': 'Profile Found Successfully Public Official'}), 200



@app.route("/add-user-by-admin", methods=["GET", "POST"])
@jwt_required()
@check_role_and_authorize('PublicOfficial')
def add_user_by_admin():
    if request.method == "POST":
        user_details = request.get_json()  # store the json body request
        encrpted_password = hashlib.sha256(user_details['password'].encode("utf-8")).hexdigest()
        db.users.insert_one({
                "username":user_details['username'],
                "password":encrpted_password,
                "role":user_details['role']
            })
        return "User Saved Successfully", 200



@app.route("/upload-data-by-community", methods=["POST"])
@jwt_required()
@check_role_and_authorize('CommunitySocialWorker')
def upload_data_by_community():
    if request.method == "POST":
        current_user = get_jwt_identity()
        community_name = request.form.get('community_name')
        community_size = request.form.get('community_size')
        csv_file = request.files['csv_file']

        # check format
        df = pd.read_csv(csv_file)
        df.columns = map(str.lower, df.columns)
        if 'what bothers you?' in df.columns and 'age' in df.columns:
            pass
        else:
            return "CSV file is not specific format", 400

        # convert csv to dict
        convert_dict = df.to_dict()
        new_dict = {}
        if 0 in convert_dict['what bothers you?']:
            new_dict['what bothers you'] = convert_dict['what bothers you?'][0]
        else:
            new_dict['what bothers you']  = convert_dict['what bothers you?']
        if 0 in convert_dict['age']:
            new_dict['age'] = convert_dict['age'][0]
        else:
            new_dict['age'] = convert_dict['age']

        db.community.insert_one({
                "username":current_user,
                "community_name":community_name,
                "community_size":community_size,
                "csv_file":new_dict,
        })
        return "Data Uploaded Successfully", 200




@app.route("/review-statistics-by-community", methods=["GET"])
@jwt_required()
@check_role_and_authorize('CommunitySocialWorker')
def review_statistic_by_community():
    current_user = get_jwt_identity()
    get_data = db.community.find({"username":current_user})
    com_data = []
    for data in get_data:
        print(data.get('csv_file'))
        # if data.get('csv_file')['what bothers you'].lower() == 'family' and data.get('csv_file')['age'].lower() < 25:


        com_data.append({
            "username": data.get('username'),
            "community_name": data.get('community_name'),
            "community_size": data.get('community_size'),
            "csv_file": data.get('csv_file'),
            "classifiation":"unknown"
        })
    return jsonify(com_data), 200


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8000))
    app.run(debug=True, host='0.0.0.0', port=port)
