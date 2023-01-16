from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request
from flask import Flask, request, jsonify, make_response
from werkzeug.utils import secure_filename
from flask_pymongo import PyMongo
from flask_cors import CORS
from functools import wraps
import pandas as pd
import hashlib
import csv
import os




# Flask app configurations
app = Flask(__name__)
app.config['SECRET_KEY'] = "e71e95b221e9c960889260960a244de2f0a9c7a8"   # Flask secret key
app.config['MONGO_URI'] = "mongodb+srv://talhasarwa999:ali2061989@cluster0.sy4ye0l.mongodb.net/TestMongo?retryWrites=true&w=majority"   # Databse URI
mongo_client = PyMongo(app)
db = mongo_client.db
jwt = JWTManager(app)
CORS(app)




@app.route('/user-signin', methods=["POST"])
def user_signin():
    if request.method == "POST":
        login_details = request.get_json()  # store the json body request
        user_from_db = db.users.find_one({'username': login_details['username']})   # check if user exist
        if user_from_db:
            encrypted_password = hashlib.sha256(login_details['password'].encode("utf-8")).hexdigest()
            if encrypted_password == user_from_db['password']:
                if user_from_db['role'] == 'Admin':
                    access_token = create_access_token(identity=user_from_db['username'])   # create jwt token
                    role = 'Admin'
                    return jsonify(access_token=access_token, role=role)

                elif user_from_db['role'] == 'CommunitySocialWorker':
                    access_token = create_access_token(identity=user_from_db['username'])   # create jwt token
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
            verify_jwt_in_request()   # verify jwt exist
            current_user = get_jwt_identity() # get current user
            user_from_db = db.users.find_one({'username': current_user})    # check if user exist
            if user_from_db and user_from_db['role'] == user_role:  # check if role exist
                return fn(*args, **kwargs)
            else:
                return jsonify(msg="bad request!"), 404
        return decorator
    return wrapper



@app.route("/admin-dashboard", methods=["GET"])
@jwt_required()
@check_role_and_authorize('Admin')
def admin_dashboard():
    return jsonify({'msg': 'Admin Logged-in Successfully'}), 200



@app.route("/community-dashboard", methods=["GET"])
@jwt_required()
@check_role_and_authorize('CommunitySocialWorker')
def community_dashboard():
    return jsonify({'msg': 'Community Social Worker Logged-in Successfully'}), 200



@app.route("/public-official-dashboard", methods=["GET"])
@jwt_required()
@check_role_and_authorize('PublicOfficial')
def public_official_dashboard():
    return jsonify({'msg': 'Public Official Logged-in Successfully'}), 200



@app.route("/add-user-by-admin", methods=["POST"])
@jwt_required()
@check_role_and_authorize('Admin')
def add_user_by_admin():
    if request.method == "POST":
        user_details = request.get_json()   # store the json body request
        encrypted_password = hashlib.sha256(user_details['password'].encode("utf-8")).hexdigest()   # to encrypt password
        db.users.insert_one({
                "username":user_details['username'],
                "password":encrypted_password,
                "role":user_details['role']
            })
        return "User Added Successfully", 200



@app.route("/upload-data-by-community", methods=["POST"])
@jwt_required()
@check_role_and_authorize('CommunitySocialWorker')
def upload_data_by_community():
    if request.method == "POST":
        current_user = get_jwt_identity()   # get user from JWT
        community_name = request.form.get('community_name')
        community_size = request.form.get('community_size')
        csv_file = request.files['csv_file']

        # validate csv file only
        filename = secure_filename(csv_file.filename)
        if filename.split('.')[-1] == 'csv':
            pass
        else:
            return f"{filename} not a csv file", 400


        # check specific format for csv file
        df = pd.read_csv(csv_file, nrows=1)
        df.columns = map(str.lower, df.columns)
        if 'what bothers you?' in df.columns and 'age' in df.columns and len(df.columns) == 2:
            pass
        else:
            return "CSV file is not specific format", 400


        # convert nested dict to single dict
        convert_dict = df.to_dict()
        new_dict = {}
        if 0 in convert_dict['what bothers you?']:
            new_dict['what bothers you?'] = convert_dict['what bothers you?'][0]
        else:
            new_dict['what bothers you?']  = convert_dict['what bothers you?']
        if 0 in convert_dict['age']:
            new_dict['age'] = convert_dict['age'][0]
        else:
            new_dict['age'] = convert_dict['age']

        # save to database
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
    current_user = get_jwt_identity()   # get user from JWT
    get_data = db.community.find({"username":current_user})

    # get csv uploaded data and add classfication
    com_data = []
    for data in get_data:
        bothers = str(data.get('csv_file')['what bothers you?']).lower()
        age = int(data.get('csv_file')['age'])
        if bothers == 'family' and age < 25:
            classification = 'FAMILY'
        elif bothers == 'health' and age > 18:
            classification = 'HEALTH'
        else:
            classification = 'UNKNOWN'

        com_data.append({
            "username": data.get('username'),
            "community_name": data.get('community_name'),
            "community_size": data.get('community_size'),
            "csv_file": data.get('csv_file'),
            "classification":classification
        })

    # separate classification type to get length
    family_list = []
    health_list = []
    unknown_list = []
    for data in com_data:
        if data['classification'] == 'FAMILY':
            family_list.append(data['classification'])
        elif data['classification'] == 'HEALTH':
            health_list.append(data['classification'])
        else:
            unknown_list.append(data['classification'])

    # calculate percentage of each classification
    family_percentage = 0
    health_percentage = 0
    unknown_percentage = 0

    if len(com_data) != 0:
        family_percentage = (len(family_list) / len(com_data)) * 100
        health_percentage = (len(health_list) / len(com_data)) * 100
        unknown_percentage = (len(unknown_list) / len(com_data)) * 100

    relative_percentage = {}
    relative_percentage['family_percentage'] = family_percentage
    relative_percentage['health_percentage'] = health_percentage
    relative_percentage['unknown_percentage'] = unknown_percentage

    return jsonify(com_data, relative_percentage), 200



@app.route("/public-official-review", methods=["GET"])
@jwt_required()
@check_role_and_authorize('PublicOfficial')
def public_official_review():
    get_data = db.community.find()

    # get csv uploaded data and add classfication
    com_data = []
    for data in get_data:
        bothers = str(data.get('csv_file')['what bothers you?']).lower()
        age = int(data.get('csv_file')['age'])
        if bothers == 'family' and age < 25:
            classification = 'FAMILY'
        elif bothers == 'health' and age > 18:
            classification = 'HEALTH'
        else:
            classification = 'UNKNOWN'

        com_data.append({
            "username": data.get('username'),
            "community_name": data.get('community_name'),
            "community_size": data.get('community_size'),
            "csv_file": data.get('csv_file'),
            "classification": classification
        })

    # separate classification type to get length
    family_list = []
    health_list = []
    unknown_list = []
    for data in com_data:
        if data['classification'] == 'FAMILY':
            family_list.append(data['classification'])
        elif data['classification'] == 'HEALTH':
            health_list.append(data['classification'])
        else:
            unknown_list.append(data['classification'])

    # calculate percentage of each classification
    family_percentage = 0
    health_percentage = 0
    unknown_percentage = 0

    if len(com_data) != 0:
        family_percentage = (len(family_list) / len(com_data)) * 100
        health_percentage = (len(health_list) / len(com_data)) * 100
        unknown_percentage = (len(unknown_list) / len(com_data)) * 100

    relative_percentage = {}
    relative_percentage['family_percentage'] = family_percentage
    relative_percentage['health_percentage'] = health_percentage
    relative_percentage['unknown_percentage'] = unknown_percentage
    return jsonify(com_data, relative_percentage), 200




@app.route("/send-message-by-publicofficial", methods=["POST"])
@jwt_required()
@check_role_and_authorize('PublicOfficial')
def send_message_by_publicofficial():
    if request.method == "POST":
        json_data = request.get_json()  # get user from JWT
        community = db.community.find_one({"community_name": json_data['community_name']})  # get user by community
        db.messages.insert_one({
            "username": community['username'],
            "message": json_data['message'],
        })
        return "Message Added Successfully", 200



@app.route("/review-message-by-community", methods=["GET"])
@jwt_required()
@check_role_and_authorize('CommunitySocialWorker')
def review_message_by_community():
    current_user = get_jwt_identity()   # get user from JWT
    community_user_msg = db.messages.find({"username": current_user})   # get messages by username
    all_messages = []
    for message in community_user_msg:
        all_messages.append({
            "message": message['message']
        })
    return jsonify(all_messages), 200



if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8000))
    app.run(debug=True, host='0.0.0.0', port=port)
