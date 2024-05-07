import './App.css';
import useToken from './Components/UseToken';
import Login from './Views/Login';
import StartScreen from './Views/StartScreen';
import { Route, Routes , Navigate} from 'react-router';
import { useEffect } from 'react';
import { io } from 'socket.io-client';
import Character from './Views/PickCharacter';
import Matchmaking from "./Views/Matchmaking";
import MainGame from './Views/GameMain';
import CreateJoin from './Views/CreateJoin';

const socket = io('http://localhost:8080');

function App() {
  const { token, removeToken, setToken , name,  setName , room , setRoom} = useToken();
  
  return (
      <main className=' font-Lora'>
        <Routes>
          <Route path='/Login' element = {<Login socket = {socket} token = {token} removeToken = {removeToken} setToken={setToken} name = {name} setName = {setName} />} />
          <Route path='/' element = {<StartScreen /> } />

          <Route path='/Main/*' element = {<MainGame room = {room} setRoom = {setRoom} socket = {socket} token = {token} removeToken = {removeToken} setToken={setToken} name = {name} setName = {setName} />}>
            <Route index element = {<Navigate to = "PickCharacter" />} />
              <Route path='PickCharacter' element = {<Character room = {room} setRoom = {setRoom} socket = {socket} token = {token} removeToken = {removeToken} setToken={setToken} name = {name} setName = {setName}  /> } />
              <Route path='CreateJoin' element = {<CreateJoin room = {room} setRoom = {setRoom} socket = {socket} token = {token} removeToken = {removeToken} setToken={setToken} name = {name} setName = {setName}  /> } />
          </Route>

          <Route path='/Game/:roomId' element = {<Matchmaking room = {room} setRoom = {setRoom} socket = {socket} token = {token} removeToken = {removeToken} setToken={setToken} name = {name} setName = {setName}  /> } />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
  );
}

export default App;