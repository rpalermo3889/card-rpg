from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import inspect
import json
import pymysql


db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(250), unique=True)
    password = db.Column(db.String(250))
    charfront = db.Column(db.String(250))
    charmid = db.Column(db.String(250))
    charback = db.Column(db.String(250))
    wins = db.Column(db.Integer)
    
    def __init__(self, username , password):
        self.username = username
        self.password = password
        self.charfront = "Warrior"
        self.charmid = "Warrior"
        self.charback = "Warrior"
        self.wins = 0
    
    def to_dict(self):
        return {
            'username': self.username,
            'password': self.password,
            'charfront': self.charfront,
            'charmid': self.charmid,
            'charback': self.charback,
            'wins': self.wins
        } 
        
def init__app(app):
    db.__init__(app)