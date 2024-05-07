#basic card format
# class card:
#     name = ""
#     text = ""
#     player = 0

#     def __init__(self, player):
#         self.player = player

#     def play_card(self, target):
#         print("Do a thing")

class card_strike:
    name = "Strike"
    text = "Do 20 damage to one target"
    player = 0

    def __init__(self, player):
        self.player = player

    def play_card(self, target, args):
        target.modifyHealth(-20)
        return 0

class card_cleave:
    name = "Cleave"
    text = "Do 10 damage to all enemies"
    player = 0

    def __init__(self, player):
        self.player = player

    def play_card(self, target, args):
        for enemy in target:
            enemy.modifyHealth(-10)
            return 0

class card_leap:
    name = "Leap"
    text = ""
    player = 0

    def __init__(self, player):
        self.player = player

    def play_card(self, target, args):
        target.modifyHealth(-10 * args)
        return 10

class card_heavy_blow:
    name = "Heavy Blow"
    text = ""
    player = 0

    def __init__(self, player):
        self.player = player

    def play_card(self, target, args):
        if args[0] == 1:
            target.modifyHealth(-30)
        else:
            target.modifyHealth(-10)
        return 11
        
class card_bash:
    name = "Bash"
    text = ""
    player = 0

    def __init__(self, player):
        self.player = player

    def play_card(self, target, args):
        target.modifyHealth(-15)
        return 0
        
class card_taunt:
    name = "Taunt"
    text = ""
    player = 0

    def __init__(self, player):
        self.player = player

    def play_card(self, target, args):
        return 20

class card_cover:
    name = "Cover"
    text = ""
    player = 0

    def __init__(self, player):
        self.player = player

    def play_card(self, target, args):
        return 21

class card_heavy_guard:
    name = "Heavy Guard"
    text = ""
    player = 0

    def __init__(self, player):
        self.player = player

    def play_card(self, target, args):
        return 22
    
class card_spark:
    name = "Spark"
    text = ""
    player = 0

    def __init__(self, player):
        self.player = player

    def play_card(self, target, args):
        target.modifyHealth(-10)
        return 0

class card_heal:
    name = "Heal"
    text = ""
    player = 0

    def __init__(self, player):
        self.player = player

    def play_card(self, target, args):
        target.modifyHealth(20)
        return 0

class card_restoration:
    name = "Restoration"
    text = ""
    player = 0

    def __init__(self, player):
        self.player = player

    def play_card(self, target, args):
        target.modifyHealth(10)
        return 30

class card_mass_heal:
    name = "Mass Heal"
    text = ""
    player = 0

    def __init__(self, player):
        self.player = player

    def play_card(self, target, args):
        for ally in target:
            ally.modifyHealth(-10)
            return 0
        

