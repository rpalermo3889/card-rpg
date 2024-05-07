import React , {useState , useEffect} from "react";
import usericon from "../img/user1.png";
import Popup from "../Components/Popup";
import { Socket, io } from 'socket.io-client';
import axios from "axios";

export default function StartScreen(props){

    const [data , setData] = useState([])
    function getData(){
        axios.get(`${process.env.REACT_APP_API_URL}/get_room_list` ,
        {
            headers: {
                "Content-Type": 'application/json',
            },
        }
        )
        .then((resp) => {
            const res = resp.data
            setData(res.msg);
            console.log(data);
        })
        .catch(function(error){
            console.log(error);
            window.location.href = "/Login";
        });
    }

    useEffect(() => {
        getData();
    } , []);

    return (
        <section className="">
            <div className=" bg-bg1 bg-no-repeat bg-center bg-cover h-screen w-screen overflow-hidden overscroll-y-none overscroll-none">
                <div className=" w-screen h-screen p-6  bg-black bg-opacity-25">
                    <div className="flex justify-start">
                        <div className=" cursor-pointer border-[1px] group rounded-full bg-white">
                            <img className=" w-20 transition group-hover:opacity-60 ease-in-out duration-200 delay-75 h-20" src={usericon} />
                        </div>
                    </div>
                    <div className=" flex flex-col mt-28 space-y-16 w-screen h-screen">
                        <h2 className=" type-fruit font-Play text-center text-white/80 text-6xl"></h2>
                        <div className=" flex items-center flex-col space-y-8">
                            <button  onClick={() => window.location.href = "/Login"} className="before:ease relative overflow-hidden transition-all before:absolute before:right-0 
                                before:top-0 before:h-full before:w-6 before:translate-x-12 before:rotate-6 
                                before:bg-white before:opacity-10 before:duration-700 
                                hover:before:-translate-x-80 shadow-lg text-xl text-white bg-red-400 w-[300px] py-6">
                                <span>Log In</span>
                            </button>
                        </div>
                        <div className=" flex justify-center ">
                            {data.map((s) => (
                                <div className="flex text-white text-3xl space-x-8">
                                    <div>
                                        <span>Room Playing: </span>
                                    </div>
                                    <div>
                                        <span>{s}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* <Popup socket = {props.socket} setRoom = {props.setRoom} name = {props.name} Rid = {Rid} setRid = {setRid} isOpen = {isOpen} setIsOpen={setIsOpen} /> */}
        </section>
    )
}