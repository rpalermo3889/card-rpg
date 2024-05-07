import React , {useState} from "react";
import Popup from "../Components/Popup";
import axios from "axios";
import { useNavigate } from "react-router";

export default function CreateJoin(props){

    const [isOpen , setIsOpen] = useState(true);
    const [Rid , setRid] = useState("");

    const navigate = useNavigate();

    function Create_Room(e){
        e.preventDefault();

        axios.post(`${process.env.REACT_APP_API_URL}/create_room`)
        .then(function (resp) {
            if (resp.data.msg === 'a'){
                const room = resp.data.msg;
                props.setRoom(room);
                const uname = props.name;
                props.socket.emit('join', {uname, room});
                navigate(`/Game/${room}`);
            }

            else{
                alert(resp.data.msg);
            }
        })
    };

    return (
        <div className=' mx-auto max-w-screen-lg'>
            <div className=' flex flex-col h-screen justify-center space-y-12 items-center'>
                <h2 className=" type-test1 font-Play text-center text-white/80 text-6xl"></h2>
                <div className=" flex flex-col space-y-8">
                    <div>
                        <button onClick={Create_Room} className="before:ease relative overflow-hidden transition-all before:absolute before:right-0 
                            before:top-0 before:h-full before:w-6 before:translate-x-12 before:rotate-6 
                            before:bg-white before:opacity-10 before:duration-700 
                            hover:before:-translate-x-80 shadow-lg text-xl text-white bg-red-400 w-[300px] py-6">
                            <span>Create Room</span>
                        </button>
                    </div>

                    <div>
                        <button onClick={() => setIsOpen(!isOpen)} className="before:ease relative overflow-hidden transition-all before:absolute before:right-0 
                            before:top-0 before:h-full before:w-6 before:translate-x-12 before:rotate-6 
                            before:bg-white before:opacity-10 before:duration-700
                            hover:before:-translate-x-80 shadow-lg text-xl text-white bg-sky-400 w-[300px] py-6">
                            <span>Join Room</span>
                        </button>
                    </div>
                </div>
            </div>

            <Popup socket = {props.socket} setRoom = {props.setRoom} name = {props.name} Rid = {Rid} setRid = {setRid} isOpen = {isOpen} setIsOpen={setIsOpen} />
        
        </div>
    )
}