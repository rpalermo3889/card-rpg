import React, { useState, useEffect } from "react";
import img1 from "../img/fighter.png";
import img2 from "../img/healer.png";
import img3 from "../img/guardian.png";
import img4 from "../img/player_fighter.png";
import img5 from "../img/player_healer.png";
import img6 from "../img/player_guardian.png";
import CardSwiper from "../Components/CardSwiper";
import { useParams } from 'react-router-dom';
import CharacterData from "../Components/CharacterClass";
import axios from "axios";

export default function Matchmaking(props) {
    const [passcode, setPasscode] = useState('');
    const [matchmakingStatus, setMatchmakingStatus] = useState('idle'); // States: idle, searching, matched
    const [match, setMatch] = useState(null);
    const [socket, setSocket] = useState(null);
    const [playerCount , setplayerCount] = useState(0);
    const [player , setPlayer] = useState(1);
    const [target, setTarget] = useState("");
    const { roomId } = useParams();
    const [charData , setCharData] = useState([]);
    const [activeButtonIndex, setActiveButtonIndex] = useState(0);

    useEffect(() => {

      props.socket.on('playerCount', (data) => {
        setplayerCount(data);
      });

      props.socket.on('turnHandshake', (p) => {
        setPlayer(p);
      });
  
      props.socket.on('cardDraw', (card) => {
        console.log('Card drawn:', card);
      });
  
      props.socket.on('p1win', () => {
        alert('Player 1 Wins!');
      });
  
      props.socket.on('p2win', () => {
        alert('Player 2 Wins!');
      });

      return () => props.socket.disconnect();

    }, []);

    const handleData = (resp) => {
      alert(characterNames);
      // const matchedCharacters = characterNames.map(name => 
      //     CharacterData.find(c => c.name === name)
      // ).filter(Boolean);
      setCharData(prevData => [...prevData , resp]);
    };

  useEffect(() => {
      props.socket.emit('get_characters', { username: props.name , room: roomId});
      props.socket.on('CharactersData', handleData);
      return () => {
          props.socket.off('CharactersData', handleData);
      };
  }, []);

    const member = (target) => {
      setTarget(target);
    };


    const Data = [
      {
        id: [1, 2],
        name: 'Strike',
        desc: 'Select an enemy to strike.'
      },
      {
        id: [1, 1],
        name: 'Taunt',
        desc: 'Select an enemy to taunt.'
      },
      {
        id: [1, 0],
        name: 'Heal',
        desc: 'Select a member to heal.'
      }
    ]

    return (
      <div className="bg-bg2 bg-no-repeat space-y-12 bg-center bg-cover h-screen w-screen overflow-hidden overscroll-y-none overscroll-none">
        <div className="flex justify-between p-12">
          <div className="">
            <h1 className="text-black font-Play text-4xl">Welcome To Room {roomId}</h1>
          </div>
          <div className="">
            <h1 className="text-black font-Play text-4xl">Player Count: {playerCount}</h1>
          </div>
        </div>
        
        <div className=' flex mx-auto max-w-screen-lg'>
          <div className=" grid grid-cols-2 place-items-center w-full p-4">
            
            {/* {player === 1 && */}
              <div className=" flex translate-y-12 justify-center space-x-7">
                {charData.map((c,index) => (
                  <button key={index} onClick={() => member("p1back")} className="hover:bg-yellow-700">
                    <img src= {c.img} />
                  </button>
                ))}
              </div>
            {/* } */}

            {player === 2 &&
              <div className=" flex -translate-y-12 justify-center space-x-7">
                {charData.map((c,index) => (
                  <button key={index} onClick={() => member("p1back")} className="hover:bg-yellow-700">
                    <img src= {c.img} />
                  </button>
                ))}
              </div>
            }
          </div>
        </div>
        
        <div className=" w-screen flex justify-center gap-x-12 fixed bottom-12 px-8 z-10">
          <div className=" flex flex-col space-y-4">
            <div className=" max-w-screen-lg">
              <CardSwiper Data = {Data} />
            </div>
            {/* <div className=" flex text-2xl text-white justify-center">
              <span>Deck Count: 25</span>
            </div> */}
          </div>
          <div className=" order-last h-fit py-5">
            <div className="items-center flex justify-center">
              <div className=" flex flex-col space-y-6">
                <button className=" hover:opacity-80 bg-rose-400 py-3 text-white text-xl w-[200px]">
                  <span>Block</span>
                </button>
                <button className=" hover:opacity-80 bg-sky-400 py-3 text-white text-xl w-[200px]">
                  <span>Swap</span>
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
}