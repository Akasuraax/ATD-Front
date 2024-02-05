import { useEffect} from "react";
import { initFlowbite} from "flowbite";
import './accueil.css'
import image from '../../files/image/compte_benevole-1200x630.png'

function Accueil() {


    const donation  = "Je fais un don";
    const registration = "Je m'inscris";

    const menu = [
        "Nos activités",
        "Évènements à venir",
        "Nos locaux",
        "À propos"
    ]


    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <div>
            <img src={image} alt=""/>
        </div>
    )
}

export default Accueil