import './home.css'
import imageHome from '../../../files/image/chaine-696x419.png'
import abc from '../../../files/image/abc.png'
import admin from '../../../files/image/admin.png'
import course from '../../../files/image/course.png'
import distribution from '../../../files/image/distribution.png'
import donation from '../../../files/image/donation.png'
import emplacement from '../../../files/image/emplacement.png'
import oldCare from '../../../files/image/old-care.png'
import {Link} from "react-router-dom";

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
                <Link to="/register"
                   className="btn-first homeButton">{registration}</Link>
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

            <Activity></Activity>
        </div>
    )
}

function Activity() {


    const titleActivity = "Nos activités";
    const foodDistribution = "Distribution alimentaire";
    const administrativeDepartment = "Service administratif";
    const shuttles = "Navettes pour rendez-vous éloignés";
    const courses  = "Cours d’alphabétisation pour adultes";
    const tutoring  = "Soutien scolaire pour enfant";
    const event = "Organisation d’évènements de récoltes de fonds";
    const seniors = "Visites et activités pour personnes âgées.";

    return (
        <div className="bg-[#F1F1F1] py-12 sm:py-12 mt-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center homeTitle">{titleActivity}</h2>
                <div
                    className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <div className="text-center	">
                        <img
                            className="col-span-2 max-h-24 w-full object-contain lg:col-span-1"
                            src={abc}
                            alt="Transistor"
                            width={158}
                            height={48}
                        />
                        <p className="m-4">{tutoring}</p>
                    </div>
                    <div className="text-center	">
                        <img
                            className="col-span-2 max-h-24 w-full object-contain lg:col-span-1"
                            src={admin}
                            alt="Reform"
                            width={158}
                            height={48}
                        />
                        <p className="m-4">{administrativeDepartment}</p>
                    </div>
                    <div className="text-center	">
                        <img
                            className="col-span-2 max-h-24 w-full object-contain lg:col-span-1"
                            src={course}
                            alt="Tuple"
                            width={158}
                            height={48}
                        />
                        <p className="m-4">{courses}</p>
                    </div>
                    <div className="text-center	">
                        <img
                            className="col-span-2 max-h-24 w-full object-contain sm:col-start-2 lg:col-span-1"
                            src={distribution}
                            alt="SavvyCal"
                            width={158}
                            height={48}
                        />
                        <p className="m-4">{foodDistribution}</p>
                    </div>
                    <div className="text-center	">
                        <img
                            className="col-span-2 col-start-2 max-h-24 w-full object-contain sm:col-start-auto lg:col-span-1"
                            src={donation}
                            alt="Statamic"
                            width={158}
                            height={48}
                        />
                        <p className="m-4">{event}</p>
                    </div>
                    <div className="text-center	">
                        <img
                            className="col-span-2 col-start-2 max-h-24 w-full object-contain sm:col-start-auto lg:col-span-1"
                            src={emplacement}
                            alt="Statamic"
                            width={158}
                            height={48}
                        />
                        <p className="m-4">{shuttles}</p>
                    </div>
                    <div className="text-center	">
                        <img
                            className="col-span-2 col-start-2 max-h-24 w-full object-contain sm:col-start-auto lg:col-span-1"
                            src={oldCare}
                            alt="Statamic"
                            width={158}
                            height={48}
                        />
                        <p className="m-4 font">{seniors}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home