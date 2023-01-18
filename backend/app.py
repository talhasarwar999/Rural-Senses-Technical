import hashlib
import os

import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask_swagger_ui import get_swaggerui_blueprint
from mongoengine import connect
from werkzeug.utils import secure_filename

from models import *
from permissions import *

# Flask app configurations
app = Flask(__name__)
app.config['SECRET_KEY'] = "e71e95b221e9c960889260960a244de2f0a9c7a8"  # Flask secret key
app.config["MONGODB_DB"] = 'TestMongo'  # Database Name

connect(
    'TestMongo',
    username='talhasarwar999',
    password='ali2061989',
    host='mongodb+srv://talhasarwa999:ali2061989@cluster0.sy4ye0l.mongodb.net/TestMongo?retryWrites=true&w=majority',
    port=10043
)  # Database Connection
SWAGGER_URL = '/swagger'
API_URL = '/static/swagger.json'
SWAGGER_BLUEPRINT = get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name': "app"
    }
)
app.register_blueprint(SWAGGER_BLUEPRINT, url_prefix=SWAGGER_URL)
jwt = JWTManager(app)
CORS(app)


@app.route('/api/user-signin', methods=["POST"])
def user_signin():
    if request.method == "POST":
        login_details = request.get_json()  # store the json body request
        user_from_db = User.objects(username=login_details['username']).first()  # check if user exist

        if user_from_db:
            encrypted_password = hashlib.sha256(login_details['password'].encode("utf-8")).hexdigest()
            if encrypted_password == user_from_db['password']:
                if user_from_db['role'] == 'Admin':
                    access_token = create_access_token(identity=user_from_db['username'])  # create jwt token
                    role = 'Admin'
                    return jsonify(access_token=access_token, role=role), 200

                elif user_from_db['role'] == 'CommunitySocialWorker':
                    access_token = create_access_token(identity=user_from_db['username'])  # create jwt token
                    role = 'CommunitySocialWorker'
                    return jsonify(access_token=access_token, role=role), 200

                elif user_from_db['role'] == 'PublicOfficial':
                    access_token = create_access_token(identity=user_from_db['username'])  # create jwt token
                    role = 'PublicOfficial'

                    return jsonify(access_token=access_token, role=role), 200


        return jsonify({'msg': 'The username or password is incorrect'}), 400


@app.route("/api/admin-dashboard", methods=["GET"])
@jwt_required()
@check_role_and_authorize('Admin')
def admin_dashboard():
    return jsonify({'msg': 'Admin Logged-in Successfully'}), 200


@app.route("/api/community-dashboard", methods=["GET"])
@jwt_required()
@check_role_and_authorize('CommunitySocialWorker')
def community_dashboard():
    return jsonify({'msg': 'Community Social Worker Logged-in Successfully'}), 200


@app.route("/api/public-official-dashboard", methods=["GET"])
@jwt_required()
@check_role_and_authorize('PublicOfficial')
def public_official_dashboard():
    return jsonify({'msg': 'Public Official Logged-in Successfully'}), 200


@app.route("/api/add-user-by-admin", methods=["POST"])
@jwt_required()
@check_role_and_authorize('Admin')
def add_user_by_admin():
    if request.method == "POST":
        user_details = request.get_json()  # store the json body request
        encrypted_password = hashlib.sha256(user_details['password'].encode("utf-8")).hexdigest()  # Encrypt password
        add_user = {
            "username": user_details['username'],
            "password": encrypted_password,
            "role": user_details['role']
        }
        user = User(**add_user)
        user.save()
        return "User Added Successfully", 200


@app.route("/api/upload-data-by-community", methods=["POST"])
@jwt_required()
@check_role_and_authorize('CommunitySocialWorker')
def upload_data_by_community():
    if request.method == "POST":
        current_user = get_jwt_identity()  # get current user from JWT
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


@app.route("/api/review-statistics-by-community", methods=["GET"])
@jwt_required()
@check_role_and_authorize('CommunitySocialWorker')
def review_statistic_by_community():
    current_user = get_jwt_identity()  # get current user from JWT
    get_user = User.objects(username=current_user).first()

    # calculate relative prcentage using group by clause
    pipeline = {"$group": {
        "_id": "$classification",
        "total": {"$sum": 1}
    }
    }
    aggregated_data = Feedback.objects(user=get_user).aggregate(pipeline)

    relative_percentage = {}
    for data in aggregated_data:
        key = data["_id"]
        relative_percentage[key] = data["total"]

    fake = {"labels": ["H", "F"], "values": [2, 5]}
    return jsonify(relative_percentage), 200


@app.route("/api/public-official-review", methods=["GET"])
@jwt_required()
@check_role_and_authorize('PublicOfficial')
def public_official_review():
    pipeline = [
        {
            "$group": {
                "_id": {
                    "__alias_0": "$classification",
                    "__alias_1": "$community"
                },
                "__alias_2": {
                    "$sum": {
                        "$cond": [
                            {
                                "$ne": [
                                    {
                                        "$type": "$classification"
                                    },
                                    "missing"
                                ]
                            },
                            1,
                            0
                        ]
                    }
                }
            }
        },
        {
            "$project": {
                "_id": 0,
                "__alias_0": "$_id.__alias_0",
                "__alias_1": "$_id.__alias_1",
                "__alias_2": 1
            }
        },
        {
            "$project": {
                "group": "$__alias_0",
                "communitite": "$__alias_1",
                "value": "$__alias_2",
                "_id": 0
            }
        },
        {
            "$group": {
                "_id": {
                    "group": "$group"
                },
                "__grouped_docs": {
                    "$push": "$$ROOT"
                }
            }
        },
        {
            "$sort": {
                "_id.group": 1
            }
        },
        {
            "$unwind": {
                "path": "$__grouped_docs"
            }
        },
        {
            "$replaceRoot": {
                "newRoot": "$__grouped_docs"
            }
        },
        {
            "$limit": 50000
        }
    ]
    aggregated_data = Feedback.objects().aggregate(pipeline)

    data = {}
    communities = []
    HEALTH = "HEALTH"
    FAMILY = "FAMILY"
    UNKOWN = "UNKNOWN"

    copy_aggregated_data = []
    for item in aggregated_data:
        copy_aggregated_data.append(item)
        if item["communitite"] not in communities:
            communities.append(item["communitite"])

    for item in copy_aggregated_data:
        if item["group"] == FAMILY:
            if data.get(FAMILY) is None:
                data[FAMILY] = []

            community_no = communities.index(item["communitite"])
            data[FAMILY].insert(community_no, item["value"])

        elif item["group"] == HEALTH:
            if data.get(HEALTH) is None:
                data[HEALTH] = []

            community_no = communities.index(item["communitite"])
            data[HEALTH].insert(community_no, item["value"])

        elif item["group"] == UNKOWN:
            if data.get(UNKOWN) is None:
                data[UNKOWN] = []

            community_no = communities.index(item["communitite"])
            data[UNKOWN].insert(community_no, item["value"])

    result = {
        "communities": communities,
        "data": data
    }

    return jsonify(result), 200


@app.route("/api/send-message-by-publicofficial", methods=["POST"])
@jwt_required()
@check_role_and_authorize('PublicOfficial')
def send_message_by_publicofficial():
    if request.method == "POST":
        json_data = request.get_json()  # store the json body request
        current_user = get_jwt_identity()  # get current user from JWT
        msg_data = {
            "community": json_data['community'],
            "sender": current_user,
            "message": json_data['message'],
        }
        save_message = Message(**msg_data)
        save_message.save()
        return "Message Added Successfully", 200


@app.route("/api/review-message-by-community", methods=["GET"])
@jwt_required()
@check_role_and_authorize('CommunitySocialWorker')
def review_message_by_community():
    current_user = get_jwt_identity()  # get current user from JWT

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


@app.route("/api/get-communities", methods=["GET"])
@jwt_required()
@check_role_and_authorize('PublicOfficial')
def get_communities():
    entire_community = Feedback.objects()
    com_data = []
    for community in entire_community:
        com_data.append({
            "community": community.community,
            "community_size": community.community_size,
            "description": community.description,
            "age": community.age,
            "classification": community.classification
        })
    return jsonify(com_data), 200


if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8000))
    app.run(debug=True, host='0.0.0.0', port=port)
