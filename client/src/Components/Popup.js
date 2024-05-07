import React , {useState} from "react";
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from "react-router";

export default function Popup(props){

    const navigate = useNavigate();
    const RoomJoin = (rid) => {
        const room = rid;
        const uname = props.name;

        if (room !== '' && uname !== '') {
            props.socket.emit('join', {uname, room});
            props.setRoom(room);
            navigate(`/Game/${room}`);
        }
    };

    return (
        <div className={`${!props.isOpen? "opacity-100" : "hidden" } fixed left-0 top-0 inset-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50 py-10`}>
			<div className="w-full pb-6 -mt-12 -mr-24 max-w-lg overflow-y-auto sm:rounded-2xl bg-white h-fit bg-center bg-cover bg-no-repeat">
                <div className=' flex justify-end'>
                    <div className=''>
                        <button className = " hover:rounded-full hover:bg-gray-200 rounded-none p-3" onClick={ () => props.setIsOpen(!props.isOpen)}>
                            <FontAwesomeIcon className=' text-lg' icon={faXmark} />
                        </button>
                    </div>
                </div>
                <div className=" px-4 py-4">
                    <form className="">
                        <div className=" space-y-2">
                            <label for="id" className="block text-md text-gray-800">Room ID</label>
                            <input name="id" value={props.Rid} onChange={(e) => props.setRid(e.target.value)} className="block w-full px-4 py-2 border-sky-500 border-2 text-sky-700 bg-white rounded-md focus:border-sky-400 focus:ring-sky-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                        </div>
                    </form>         
                </div>
                <div className=' flex justify-center'>
                    <button onClick={() => RoomJoin(props.Rid)} className=' w-[150px] text-white bg-sky-400 hover:opacity-50 transition-all ease-in-out delay-100 duration-200 shadow-md py-2'>Join Room</button>   
                </div>   
            </div>
        </div>
    )
}