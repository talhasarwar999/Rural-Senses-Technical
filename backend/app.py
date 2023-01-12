from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS
import hashlib
import os


app = Flask(__name__)
app.config['SECRET_KEY'] = "e71e95b221e9c960889260960a244de2f0a9c7a8"
app.config['MONGO_URI'] = "mongodb+srv://talhasarwa999:ali2061989@cluster0.sy4ye0l.mongodb.net/TestMongo?retryWrites=true&w=majority"
mongo_client = PyMongo(app)
db = mongo_client.db
jwt = JWTManager(app)
CORS(app)


@app.route('/')
def home():
    # encrypted_password = hashlib.sha256("admin123".encode("utf-8")).hexdigest()
    # db.users.insert_one({
    #         "username":"admin",
    #         "password":encrypted_password,
    #         "role":"Admin"
    #     })
    return jsonify("Hellow")


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



@app.route("/admin-dashboard", methods=["GET"])
@jwt_required()
def admin_dashboard():
    current_user = get_jwt_identity()  # Get the identity of the current user
    user_from_db = db.users.find_one({'username': current_user})
    print(current_user)
    if user_from_db and user_from_db['role'] == 'Admin':
        del user_from_db['_id'], user_from_db['password']  # delete data we don't want to return
        return jsonify({'profile': user_from_db})
    else:
        return jsonify({'msg': 'Profile not found'})



@app.route("/community-dashboard", methods=["GET"])
@jwt_required()
def community_dashboard():
    current_user = get_jwt_identity()  # Get the identity of the current user
    user_from_db = db.users.find_one({'username': current_user})
    print(current_user)
    if user_from_db and user_from_db['role'] == 'CommunitySocialWorker':
        del user_from_db['_id'], user_from_db['password']  # delete data we don't want to return
        return jsonify({'profile': user_from_db})
    else:
        return jsonify({'msg': 'Community Profile not found'})



@app.route("/public-official-dashboard", methods=["GET"])
@jwt_required()
def public_official_dashboard():
    current_user = get_jwt_identity()  # Get the identity of the current user
    user_from_db = db.users.find_one({'username': current_user})
    print(current_user)
    if user_from_db and user_from_db['role'] == 'PublicOfficial':
        del user_from_db['_id'], user_from_db['password']  # delete data we don't want to return
        return jsonify({'profile': user_from_db})
    else:
        return jsonify({'msg': 'Public Official Profile not found'})



if __name__ == "__main__":
    port = int(os.environ.get('PORT', 8000))
    app.run(debug=True, host='0.0.0.0', port=port)
    # db = client.RuralSenseDatabase
