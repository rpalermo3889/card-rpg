import { useState , useEffect} from 'react';

function useToken() {

  function getToken() {
    const userToken = localStorage.getItem('token');
    return userToken && userToken
  }

  function getName(){
    const userName = localStorage.getItem('name');
    return userName && userName
  }

  function getRoom(){
    const uroom = localStorage.getItem('room');
    return uroom && uroom
  }

  const [token, setToken] = useState(getToken());
  const [name , setName] = useState("");
  const [room , setRoom] = useState("");


  useEffect(() => {
    // Set the token from local storage when the component mounts
    const token = getToken();
    const name = getName();
    const room = getRoom();

    if (token) {
      setToken(token);
      saveToken(token);
      setName(name);
      saveName(name);
      setRoom(room);
      saveRoom(room);
    //   setRole(role);
    //   saveRole(role);

    }
  }, []);

  function saveToken(userToken) {
    localStorage.setItem('token', userToken);
    setToken(userToken);
  };

  function saveName(name) {
    localStorage.setItem('name', name);
    setName(name);
  };

  function saveRoom(room) {
    localStorage.setItem('room', room);
    setRoom(room);
  };

  function removeToken() {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("room");
    setToken(null);
    setName(null);
    setRoom(null);
  }

  return {
    setToken: saveToken,
    setName: saveName,
    setRoom: saveRoom,
    token,
    name,
    room,
    removeToken
  }

}

export default useToken;