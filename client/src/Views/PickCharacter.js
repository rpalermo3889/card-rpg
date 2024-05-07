import React, { useEffect , useState } from 'react';
import CharacterData from "../Components/CharacterClass";
import { Link , useNavigate } from 'react-router-dom';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
export default function Character(props) {
    // const canvasRef = useRef(null);

    // useEffect(() => {
    //     const canvas = canvasRef.current;
    //     const context = canvas.getContext('2d');
    //     const image = new Image();
    //     image.src = img1;
    //     image.onload = () => {
    //         context.clearRect(0, 0, canvas.width, canvas.height);
    //         context.drawImage(image, 0, 0, 44, 44);
    //     };
    // }, []);
    const navigate = useNavigate();

    const [total, setTotal] = useState(0);
    const [characterList, setCharacterList] = useState([]);
    const [data , setData] = useState([]);

    function Update_Characters(e){
        e.preventDefault();

        console.log(data);
        
        axios.post(`${process.env.REACT_APP_API_URL}/update_character/${props.name}` ,{
            data: data,
        })
        .then(function (resp) {

            if (resp.data.msg){
                alert (resp.data.msg);
                setCharacterList([]);
                navigate('/Main/CreateJoin');
            }

            else{
                alert(resp.data.msg);
                setCharacterList([]);
            }
        })
    };


    function deleteCharacter(index) {
        if(index > -1){
            setCharacterList(characterList.filter((_, idx) => idx !== index));
            setTotal(prevTotal => prevTotal - 1);
        }
        
    }

    function addCharacter(characterName) {
        if (total < 3) {
            const character = CharacterData.find(char => char.name === characterName);
            if (character) {
                setCharacterList(prevList => [...prevList, character]);
                setData(prevList => [...prevList, character.name] );
                setTotal(prevTotal => prevTotal + 1);
            }
        }
    }

    return (
        <div className=' mx-auto max-w-screen-md'>
            <div className=' flex flex-col h-screen justify-center space-y-8 items-center'>
                <h2 className=" type-test font-Play text-center text-white/80 text-3xl"></h2>
                <div className='grid grid-cols-3 gap-4'>
                    {CharacterData.map((s) => (
                        <div onClick={() => {
                            addCharacter(s.name);
                        }} key={s.id} className="cursor-pointer shadow-lg bg-white px-2 h-fit w-full rounded-lg mb-2 ease-in-out transition-all duration-1000 lg:hover:scale-105">
                            <div className="overflow-hidden flex justify-center">
                                <img className='' src={s.img} />
                            </div>
                            <div className="px-4 space-y-1 mb-4 mt-4">
                                <h1 className="md:text-lg text-center capitalize">{s.name}</h1>
                                <div className=' text-center text-black/60'>
                                    <span className="">
                                        {s.desc}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className=''>
                    <div className=' flex flex-col space-y-6 justify-center text-center'>
                        {/* <p className='text-white/80 font-Play text-2xl'> Selected Characters</p> */}
                        <div className='flex justify-center space-x-5'>
                            <div className="flex space-x-4 text-center overflow-y-auto justify-center items-center">
                                {characterList.map((character, index) => (
                                    <div key={index} className="cursor-pointer shadow-lg bg-white rounded-lg mb-2 p-4 ease-in-out transition-all duration-1000 lg:hover:scale-105">
                                        <p className="">{character.name} </p>
                                        <img src={character.img} alt={character.name} className="h-20 w-20" />
                                    </div>
                                ))}
                            </div>
                            {total > 0 && (
                                <div onClick={() => deleteCharacter(total - 1)} className='overflow-x-hidden flex justify-center shadow-lg items-center'>
                                    <button className=' text-white bg-red-400 px-8 py-2'>
                                        <FontAwesomeIcon className=' text-lg' icon={faArrowLeft} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                
                {total === 3 &&
                    <div onClick={Update_Characters} className=" flex items-center text-center flex-col space-y-8">
                        <button className="before:ease relative overflow-hidden transition-all before:absolute before:right-0 
                            before:top-0 before:h-full before:w-6 before:translate-x-12 before:rotate-6 
                            before:bg-white before:opacity-10 before:duration-700 
                            hover:before:-translate-x-80 shadow-lg text-xl text-white bg-green-400 w-[200px] py-4">
                            Continue
                        </button>
                    </div>
                }
            </div>
        </div>
    );
}