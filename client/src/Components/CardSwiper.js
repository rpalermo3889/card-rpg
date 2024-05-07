import {Swiper , SwiperSlide} from 'swiper/react';
import 'swiper/css';

export default function CardSwiper(props){
    const card = (room, id, name, target) => {
        console.log(props.socket)
        console.log(room, id, name, target)
        props.socket.emit('playCard', { room, id, name, target });
    };

    return(
        <Swiper
            // loop = {true}
            breakpoints={{
                340: {
                    slidesPerView:1,
                },
                700: {
                    slidesPerView: 3,
                    spaceBetween: 15
                }
            }}
            modules={[]}
        >
            {props.Data.map((r) => (
                <SwiperSlide className='' key = {r.id}>
                    <div className="bg-white cursor-pointer p-12">
                        <div className=" flex space-y-4 flex-col items-center justify-center text-center">
                            <button onClick={() => card('a', r.id, r.name, props.target)} className=" flex flex-col hover:bg-sky-700">
                                <h1 className=" text-sky-400 text-2xl">{r.name}</h1>
                            </button>
                            <div className=" font-newFont text-black/80">
                                <span>
                                    {r.desc}
                                </span>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};