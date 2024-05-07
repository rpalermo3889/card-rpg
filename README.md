A game for the CSE 108 Final Project
Client folder contains frontend code
Server folder contains backend code
Instance folder contains instanced information, such as the SQL database

A way I think to handle this
Client will need to access a few pages
1) Landing - A home page for someone not signed in to see the game and that its cool
2) Login/signup - Login/signup stuff as required for the project
3) Home - A home page for someone who is logged into the game where other game features can be accessed
4) Party building - Select the characters to put into their party
5) Matchmaking - Find a person to play against
6) Game - Playing the game against another player, interacting with the game, looking pretty.

The server will need to handle a few things as well
1) Login info - Self expanitory
2) Player data - Also self explanitory, without it there would be no reason to log in
3) Game data - Keep important game data on the server so that cheats don't propagate as easily
4) Matchmaking code - If we do matchmaking aside from making a room to play in, that will be handled server side.
5) Gamestate information - Same reason as game data, make an api to handle communicating the gamestate between players

If anything else needs to be done, please just add it into the readme like this.rectional communications between the clients and the server. The client-side application can use any of the SocketIO client libraries in Javascript, Python, C++, Java and S