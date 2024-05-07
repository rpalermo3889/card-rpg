from flask_socketio import *
from resources.characters import *
from resources.cards import *
import json
from database import *
from flask import Blueprint
import random

socket = Blueprint('socket' , __name__,)

io = SocketIO(cors_allowed_origins = '*')

RoomInfo = {
    "a": { 
        "p1": 0,
        "p2": 0,
        "p1front": 0,
        "p1mid": 0,
        "p1back": 0,
        "p1buildfront": 0,
        "p1buildmid": 0,
        "p1buildback": 0,
        "p1taunt": 0,
        "p1tauntcount": 0,
        "p1deck": [],
        "p2front": 0,
        "p2mid": 0,
        "p2back": 0,
        "p2buildfront": 0,
        "p2buildmid": 0,
        "p2buildback": 0,
        "p2deck": [],
        "p2taunt": 0,
        "p2tauntcount": 0,
        "turncount": 0,
        "turnplayer": 1,
        "playercount": 0
    }
}

def getCharacter(name, player):
    if name == "Warrior":
        return character_fighter(player)
    elif name == "Guardian":
        return character_guardian(player)
    elif name == "Healer":
        return character_healer(player)
    else:
        return 0

def initGame(room, p1, p2):
    Player1 = User.query.filter_by(username=p1).first()
    Player2 = User.query.filter_by(username=p2).first()
    RoomInfo[room]["p1"] = Player1
    RoomInfo[room]["p2"] = Player2

    RoomInfo[room]["p1front"] = getCharacter(Player1.charfront, 1)
    RoomInfo[room]["p1mid"] = getCharacter(Player1.charmid, 1)
    RoomInfo[room]["p1back"] = getCharacter(Player1.charback, 1)
    RoomInfo[room]["p2front"] = getCharacter(Player2.charfront, 2)
    RoomInfo[room]["p2mid"] = getCharacter(Player2.charmid, 2)
    RoomInfo[room]["p2back"] = getCharacter(Player2.charback, 2)

    RoomInfo[room]["turncount"] = 0
    RoomInfo[room]["turnplayer"] = random.randint(1, 2)

    # RoomInfo[room["p1deck"]] = []
    # RoomInfo[room["p1deck"]].extend(RoomInfo[room["p1front"]].loadCards())
    # RoomInfo[room["p1deck"]].extend(RoomInfo[room["p1mid"]].loadCards())
    # RoomInfo[room["p1deck"]].extend(RoomInfo[room["p1back"]].loadCards())

    # RoomInfo[room["p2deck"]] = []
    # RoomInfo[room["p2deck"]].extend(RoomInfo[room["p2front"]].loadCards())
    # RoomInfo[room["p2deck"]].extend(RoomInfo[room["p2mid"]].loadCards())
    # RoomInfo[room["p2deck"]].extend(RoomInfo[room["p2back"]].loadCards())

    # random.shuffle(RoomInfo[room["p1deck"]])
    # random.shuffle(RoomInfo[room["p2deck"]])

    # if RoomInfo[room["turnplayer"]] == 1:
    #     for i in range(5):
    #         drawCard(room, 1)
    #     for i in range(6):
    #         drawCard(room, 2)
    # else:
    #     for i in range(5):
    #         drawCard(room, 2)
    #     for i in range(6):
    #         drawCard(room, 1)
    beginTurn(room , RoomInfo[room]["turnplayer"])


def beginTurn(room, player):
    emit('turnHandshake', player, to=room , broadcast=True)

def drawCard(room, player):
    if player == 1:
        if len(RoomInfo[room]["p1deck"]) > 0:
            emit('cardDraw', RoomInfo[room]["p1deck"].pop(0))
            emit('cardDrawPublic', to=room , broadcast=True)
        else:
            print("what happens here")
    else:
        if len(RoomInfo[room]["p2deck"]) > 0:
            emit('cardDraw', RoomInfo[room]["p1deck"].pop(0)) 
            emit('cardDrawPublic', to=room)
        else:
            print("what happens here")

def endTurn(room): #update when the ux has calls that can be made
    if RoomInfo[room]["p1front"].getHealth() <= 0 and RoomInfo[room]["p1mid"].getHealth() <= 0 and RoomInfo[room]["p1back"].getHealth() <= 0:
        RoomInfo[room]["p2"].wins = RoomInfo[room]["p2"].wins + 1
        emit("p2win", to=room)
    elif RoomInfo[room]["p2front"].getHealth() <= 0 and RoomInfo[room]["p2mid"].getHealth() <= 0 and RoomInfo[room]["p2back"].getHealth() <= 0:
        RoomInfo[room]["p1"].wins = RoomInfo[room]["p1"].wins + 1
        emit("p1win", to=room)
    else:
        RoomInfo[room]["turnplayer"] =  RoomInfo[room]["turnplayer"] + 1
        if RoomInfo[room]["turnplayer"] > 2:
            RoomInfo[room]["turnplayer"] = 1
            RoomInfo[room]["p1tauntcount"] = RoomInfo[room]["p1tauntcount"] - 1
            RoomInfo[room]["p2tauntcount"] = RoomInfo[room]["p2tauntcount"] - 1
            if RoomInfo[room]["p1tauntcount"] <= 0:
                RoomInfo[room]["p1taunt"] = 0
            if RoomInfo[room]["p2tauntcount"] <= 0:
                RoomInfo[room]["p2taunt"] = 0
        emit("clientUpdate", RoomInfo[room]["p1front"].getHealth(), RoomInfo[room]["p1mid"].getHealth(), RoomInfo[room]["p1back"].getHealth(), RoomInfo[room]["p2front"].getHealth(), RoomInfo[room]["p2mid"].getHealth(), RoomInfo[room]["p2back"].getHealth(), to=room)
        beginTurn(room, RoomInfo[room["turnplayer"]])

@io.on('join')
def on_join(data):
    username = data["uname"]
    room = data["room"]
    join_room(room)
    RoomInfo[room]["playercount"] = RoomInfo[room]["playercount"] + 1
    emit("playerCount", RoomInfo[room]["playercount"] , to=room , broadcast=True)
    if RoomInfo[room]["playercount"] >= 2:
        initGame(room,RoomInfo[room]["p1"], RoomInfo[room]["p2"])
        print(RoomInfo[room]["playercount"])
    send(username + " has entered the room.", to=room)
    
@io.on('get_characters')
def get_char(data):
    username = data.get('username')
    room = data.get('room')
    user = User.query.filter_by(username = username).first()
    if user:
        user_list = [
            user.charfront,
            user.charmid,
            user.charback,
        ]
        emit("CharactersData" , user_list , broadcast = True , to = room)

@io.on('leave')
def on_leave(data):
    username = data["username"]
    room = data["room"]
    playerCount = data["playercount"]
    leave_room(room)
    RoomInfo[room]["playercount"] = playerCount - 1
    send(username + " has left the room.", to=room)

@io.on('playCard')
def play_card(room, source, card, target):
    # args = 0
    # # if card.name == "Leap":
    # #     args = 2
    # effect = card.play_card(target, args)
    # # if effect == 10:
    if source[0] == 1 and RoomInfo[room]["p2taunt"] != 0:
        RoomInfo[room][target] = RoomInfo[room]["p2taunt"]
    elif source[0] == 2 and RoomInfo[room]["p1taunt"] != 0:
        RoomInfo[room][target] = RoomInfo[room]["p1taunt"]

    if card == "Strike":
        RoomInfo[room][target].modifyHealth(-20)
    elif card == "Taunt":
        if (source[0] == 1):
            RoomInfo[room]["p1taunt"] = RoomInfo[room][source[1]]
            RoomInfo[room]["p1tauntcount"] = 2
        else:
            RoomInfo[room]["p2taunt"] = RoomInfo[room][source[1]]
            RoomInfo[room]["p2tauntcount"] = 2
    elif card == "Heal":
        RoomInfo[room][target].modifyHealth(10)

    endTurn(room)

@io.on('swapChar')
def swap_char(room, player, pos1, pos2):
    server1 = 0
    server2 = 0
    swapStorage = 0
    if player == 1:
        if pos1 == 0:
            server1 = "p1front"
        elif pos1 == 1:
            server1 = "p1mid"
        else:
            server1 = "p1back"
        if pos2 == 0:
            server2 = "p1front"
        elif pos2 == 1:
            server2 = "p1mid"
        else:
            server2 = "p1back"
    elif player == 2:
        if pos1 == 0:
            server1 = "p2front"
        elif pos1 == 1:
            server1 = "p2mid"
        else:
            server1 = "p2back"
        if pos2 == 0:
            server2 = "p2front"
        elif pos2 == 1:
            server2 = "p2mid"
        else:
            server2 = "p2back"
    swapStorage = RoomInfo[room][server1]
    RoomInfo[room][server1] = RoomInfo[room][server2]
    RoomInfo[room][server2] = swapStorage
    #drawCard(room, player)
    endTurn(room)


@io.on('defend')
def defend(room, player):
    if player == 1:
        RoomInfo[room]["p1front"].setStatus(1)
        RoomInfo[room]["p1mid"].setStatus(1)
        RoomInfo[room]["p1back"].setStatus(1)
    else:
        RoomInfo[room]["p2front"].setStatus(1)
        RoomInfo[room]["p2mid"].setStatus(1)
        RoomInfo[room]["p2back"].setStatus(1)
    #drawCard(room, player)
    endTurn(room)

@io.on('returnTurnHandshake')
def return_turn_handshake(player):
    emit('startTurn', player)

def init__app(app):
    io.__init__(app)