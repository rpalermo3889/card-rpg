import resources.cards as cards
class character_fighter:
    charId = 1
    health = 0
    cards = []
    status = 0
    player = 0
    def __init__(self, player):
        self.health = 100
        self.status = 0
        self.player = player
        self.cards.append(cards.card_strike(player))
        self.cards.append(cards.card_strike(player))
        self.cards.append(cards.card_strike(player))
        self.cards.append(cards.card_cleave(player))
        self.cards.append(cards.card_cleave(player))
        self.cards.append(cards.card_cleave(player))
        self.cards.append(cards.card_leap(player))
        self.cards.append(cards.card_leap(player))
        self.cards.append(cards.card_heavy_blow(player))
        self.cards.append(cards.card_heavy_blow(player))

    def loadCards(self):
        return cards
    
    def setStatus(self, status):
        self.status = status

    def getHealth(self):
        return self.health
    
    def modifyHealth(self, val):
        self.health = self.health + val

class character_guardian:
    charId = 2
    health = 0
    cards = []
    status = 0
    player = 0
    def __init__(self, player):
        self.health = 160
        self.status = 0
        self.player = player
        self.cards.append(cards.card_bash(player))
        self.cards.append(cards.card_bash(player))
        self.cards.append(cards.card_bash(player))
        self.cards.append(cards.card_taunt(player))
        self.cards.append(cards.card_taunt(player))
        self.cards.append(cards.card_taunt(player))
        self.cards.append(cards.card_cover(player))
        self.cards.append(cards.card_cover(player))
        self.cards.append(cards.card_heavy_guard(player))
        self.cards.append(cards.card_heavy_guard(player))
        
    def loadCards(self):
        return cards
    
    def setStatus(self, status):
        self.status = status

    def getHealth(self):
        return self.health
    
    def modifyHealth(self, val):
        self.health = self.health + val

class character_healer:
    charId = 3
    health = 0
    cards = []
    status = 0
    player = 0
    def __init__(self, player):
        self.health = 80
        self.status = 0
        self.player = player
        self.cards.append(cards.card_spark(player))
        self.cards.append(cards.card_spark(player))
        self.cards.append(cards.card_spark(player))
        self.cards.append(cards.card_heal(player))
        self.cards.append(cards.card_heal(player))
        self.cards.append(cards.card_heal(player))
        self.cards.append(cards.card_restoration(player))
        self.cards.append(cards.card_restoration(player))
        self.cards.append(cards.card_mass_heal(player))
        self.cards.append(cards.card_mass_heal(player))
        
    def loadCards(self):
        return cards
    
    def setStatus(self, status):
        self.status = status

    def getHealth(self):
        return self.health
    
    def modifyHealth(self, val):
        self.health = self.health + val
    