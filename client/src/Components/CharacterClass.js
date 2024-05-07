import img1 from "../img/fighter.png";
import img2 from "../img/musician.png";
import img3 from "../img/architect.png";
import img4 from "../img/guardian.png";
import img5 from "../img/healer.png";
import img6 from "../img/mage.png";



const CharacterData = [
    {
        id: 1,
        name: 'Fighter',
        desc: 'Simple DPS',
        img: img1
    },
    {
        id: 2,
        name: 'Guardian',
        desc: 'Simple Tank',
        img: img4
    },
    {
        id: 3,
        name: 'Healer',
        desc: 'Simple Healer',
        img: img5
    },
    {
        id: 4,
        name: 'Mage',
        desc: 'Glass Cannon that requires Foresight',
        img: img6
    },
    {
        id: 5,
        name: 'Architect',
        desc: 'Build Stuff to Support your Party',
        img: img3
    },
    {
        id: 6,
        name: 'Musician',
        desc: 'Play All the Songs to Play a Super song',
        img: img2
    }
]

export default CharacterData;