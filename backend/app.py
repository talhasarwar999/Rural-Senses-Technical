from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity, verify_jwt_in_request
from flask import Flask, request, jsonify, make_response
from werkzeug.utils import secure_filename
from mongoengine import connect
from flask_pymongo import PyMongo
from flask_cors import CORS
from functools import wraps
from permissions import *
from models import *
import pandas as pd
import hashlib
import csv
import os
from flask_swagger_ui import get_swaggerui_blueprint



# Flask app configurations
app = Flask(__name__)
app.config['SECRET_KEY'] = "e71e95b221e9c960889260960a244de2f0a9c7a8"   # Flask secret key
app.config["MONGODB_DB"] = 'TestMongo'  # Database Name

connect(
    'TestMongo',
    username='talhasarwar999',
    password='ali2061989',
    host='mongodb+srv://talhasarwa999:ali2061989@cluster0.sy4ye0l.mongodb.net/TestMongo?retryWrites=true&w=majority',
    port=10043
)   # Databse Connection
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
SWAGGER_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "app"
    }
)
app.register_blueprint(SWAGGER_BLUEPRINT, url_prefix = SWAGGER_URL)
jwt = JWTManager(app)
CORS(app)





@app.route('/user-signin', methods=["POST"])
def user_signin():
    if request.method == "POST":
        login_details = request.get_json()  # store the json body request
        user_from_db = User.objects(username=login_details['username']).first() # check if user exist

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
        encrypted_password = hashlib.sha256(user_details['password'].encode("utf-8")).hexdigest()   # Encrypt password
        add_user = {
                "username":user_details['username'],
                "password":encrypted_password,
                "role":user_details['role']
            }
        user = User(**add_user)
        user.save()
        return "User Added Successfully", 200



@app.route("/upload-data-by-community", methods=["POST"])
@jwt_required()
@check_role_and_authorize('CommunitySocialWorker')
def upload_data_by_community():
    if request.method == "POST":
        current_user = get_jwt_identity()   # get current user from JWT
        community = request.form.get('community')
        community_size = request.form.get('community_size')
        csv_file = request.files['csv_file']


        # validate csv file only
        filename = secure_filename(csv_file.filename)
        if filename.split('.')[-1] == 'csv':
            pass
        else:
            return f"{filename} not a csv file", 400


        # check specific format for csv file
        df = pd.read_csv(csv_file)
        df.columns = map(str.lower, df.columns)
        if 'what bothers you?' in df.columns and 'age' in df.columns and len(df.columns) == 2:
            pass
        else:
            return "CSV file is not specific format", 400

        df.rename(columns={'what bothers you?': 'description'}, inplace=True)
        user = User.objects(username=current_user).first()
        if community not in user.communities:
            user.communities.append(community)
            user.save()

        # parse csv and analyze data
        for idx, row in df.iterrows():
            classification = "UNKNOWN"
            if 'family' in row['description'].lower() and int(row['age']) < 25:
                classification = "FAMILY"
            elif 'health' in row['description'].lower() and int(row['age']) > 18:
                classification = "HEALTH"
            community_data = {
                "user": user,
                "community": community,
                "community_size": community_size,
                "classification": classification,
                "description": row['description'],
                "age": row['age'],
            }
            feedback = Feedback(**community_data)
            feedback.save()
        return "Community Data Uploaded Successfully", 200




@app.route("/review-statistics-by-community", methods=["GET"])
@jwt_required()
@check_role_and_authorize('CommunitySocialWorker')
def review_statistic_by_community():
    current_user = get_jwt_identity()   # get current user from JWT
    get_user = User.objects(username=current_user).first()

    # calculate relative prcentage using group by clause
    pipeline = {"$group": {
            "_id": "$classification",
            "total": { "$sum": 1 }
            }
    }
    aggregated_data = Feedback.objects(user=get_user).aggregate(pipeline)

    relative_percentage = []
    for data in aggregated_data:
        relative_percentage.append(data)
    return jsonify(relative_percentage), 200



@app.route("/public-official-review", methods=["GET"])
@jwt_required()
@check_role_and_authorize('PublicOfficial')
def public_official_review():

    # aggregate data using group by clause
    pipeline = [ { "$group":{
                "_id": {"classification":"$classification", "community":"$community"},
                "total": {"$sum": 1}
            }},
        { "$group": {
                "_id": "$_id.community",
                "classifications": {
                    "$push": {
                        "classification": "$_id.classification",
                        "count": "$total"
                    },
                },
                "count": { "$sum": "$total" }
        }}]
    aggregated_data = Feedback.objects().aggregate(pipeline)

    relative_percentage = []
    for data in aggregated_data:
        relative_percentage.append(data)
    return jsonify(relative_percentage), 200




@app.route("/send-message-by-publicofficial", methods=["POST"])
@jwt_required()
@check_role_and_authorize('PublicOfficial')
def send_message_by_publicofficial():
    if request.method == "POST":
        json_data = request.get_json()  # store the json body request
        current_user = get_jwt_identity()   # get current user from JWT
        msg_data = {
            "community": json_data['community'],
            "sender": current_user,
            "message": json_data['message'],
        }
        save_message = Message(**msg_data)
        save_message.save()
        return "Message Added Successfully", 200



@app.route("/review-message-by-community", methods=["GET"])
@jwt_required()
@check_role_and_authorize('CommunitySocialWorker')
def review_message_by_community():
    current_user = get_jwt_identity()   # get current user from JWT

    user = User.objects(username=current_user).first()
    all_messages = []
    for community in user.communities:
        find_msg = Message.objects(community=community)
        for msg in find_msg:
            all_messages.append({
                "message": msg.message,
                "sender": msg.sender,
                "community": msg.community,
            })
    return jsonify(all_messages), 200




if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8000))
    app.run(debug=True, host='0.0.0.0', port=port)
