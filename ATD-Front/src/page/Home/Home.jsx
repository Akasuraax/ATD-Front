import './home.css'
import ActivityComponent from "../../components/ActivityComponent.jsx";
import imageHome from '../../../files/image/chaine-696x419.png';

function Home() {

    const homeTextImage = "Votre aide peut changer la vie d’autrui";
    const registration = "Je deviens bénévole";
    const homeText = "L’association Au Temps Donné est une association humanitaire, créée en 1987 dans le département de l’Aisne, à Saint Quentin en réponse à la crise industrielle qui frappait la région. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    const homeTitle = "Au temps donné";
    const infos = "En savoir plus";


    return (
        <div>
            <div className="image">
                <text className="homeText">{homeTextImage}</text>
                <a href="#"
                   className="btn-first homeButton">{registration}</a>
            </div>

            <div className="homeBody max-w-screen-xl flex flex-nowrap justify-between mx-auto">
                <img className="imageHome" src={imageHome} alt=""></img>
                <div className="pl-16">
                    <title1 className="homeTitle">{homeTitle}</title1>
                    <p className="pt-16">{homeText}</p>
                    <a href="#"
                       className="btn-first mt-8">{infos}</a>
                </div>
            </div>

            <ActivityComponent></ActivityComponent>
        </div>
    )
}

export default Home