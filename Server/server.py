from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
import datetime
import json
from config import *
from datetime import timedelta , timezone
from flask_jwt_extended import create_access_token, JWTManager, jwt_required, get_jwt, get_jwt_identity, unset_jwt_cookies
from database import *
from logicServer import *
from flask_bcrypt import Bcrypt 

# import uuid

app = Flask(__name__)

app.config.from_object(Configuration)

jwt = JWTManager()

CORS(app , supports_credentials= True)

db.init_app(app)

jwt.init_app(app)

bcrypt = Bcrypt(app)

io.init_app(app)

app.register_blueprint(socket)

room_id_list = []

@app.after_request
def refresh_expiring_jwts(response):
    try:
        exp_timestamp = get_jwt()["exp"]
        now = datetime.datetime.now(timezone.utc)
        target_timestamp = datetime.datetime.timestamp(now + timedelta(minutes=30))
        if target_timestamp > exp_timestamp:
            access_token = create_access_token(identity=get_jwt_identity())
            data = response.get_json()
            if type(data) is dict:
                data["access_token"] = access_token 
                response.data = json.dumps(data)
        return response
    except (RuntimeError, KeyError):
        return response
    

@app.route('/register' , methods = ['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    # name = data.get('name')
    # role = data.get('role')
    
    check_user = User.query.filter_by(username = username).first()
    
    if not check_user:
        
        password = bcrypt.generate_password_hash(password).decode('utf-8')
        print(password) 
        
        user = User(username = username , password = password)
        db.session.add(user)
        db.session.commit()
        access_token = create_access_token(identity=username)
        
        return jsonify(access_token=access_token, message='Register successful'), 200
    else:
        return jsonify({'msg': 'User Already Register'}) , 404
    
# @app.route('/get_character/<username>' , methods = ['GET'])
# def get_characters(data):
    
#     username = data.get('username')
#     user = User.query.filter_by(username = username).first()
    
#     if user:
#         user_list = [
#             user.charfront,
#             user.charmid,
#             user.charback,
#         ]
        
#         return jsonify(msg = user_list), 200

@app.route('/get_room_list' , methods=['GET'])
def get_room_data():
    return jsonify({'msg': room_id_list})
    
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    user = User.query.filter_by(username=username).first()
    
    valid_pass = bcrypt.check_password_hash(user.password, password) 
    
    if user and valid_pass:  # Note: Hash the password and compare properly
        access_token = create_access_token(identity=username)        
        return jsonify(access_token=access_token, message='Login successful'), 200
        
    return jsonify({'message': 'Invalid credentials'}), 401

@app.route('/create_room' , methods = ['POST'])
def create_room():
    if len(room_id_list) == 0:
        room_id = "a"
        if room_id not in room_id_list:
            room_id_list.append(room_id)
            return jsonify({'msg': room_id})
        else:
            return jsonify({'msg': 'Room Already Created'})
    else:
        return None
    
@app.route('/update_character/<username>' , methods = ['POST'])
def update_character(username):
    
    data = request.json
    data_list = data.get('data')
    charfront = data_list[0]
    charmid = data_list[1]
    charback = data_list[2]
    
    user = User.query.filter_by(username = username).first()
    
    if user:
        user.charfront = charfront
        user.charmid = charmid
        user.charback = charback
        
        db.session.commit()

        return jsonify({'msg': 'Character Added'}) , 200
    else:
        return jsonify({'msg': 'User Not Exisited'}) , 404



@app.route("/logout" , methods = ['POST'])
@jwt_required(locations=['headers'])
def logout():
    response = jsonify(msg = "You Have Been Logout")
    unset_jwt_cookies(response=response)
    return response

##########################################################

if __name__ == '__main__':
    
    with app.app_context():
        try:
            db.create_all()
        except:
            print("Server already initialized")
            

    io.run(app, debug=True , host='localhost' , port='8080')
