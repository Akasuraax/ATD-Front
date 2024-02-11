import './home.css'
import imageHome from '../../../files/image/chaine-696x419.png'
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";
import ActivityComponent from "../../components/ActivityComponent.jsx";

function Home() {

    const { t } = useTranslation();

    const homeTextImage = t("home.homeTextImage");
    const registration = t("home.registration");
    const homeText = t("home.homeText");
    const homeTitle = t("home.homeTitle");
    const infos = t("home.infos");


    return (
        <main>
            <div className="home-page">
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

                <ActivityComponent></ActivityComponent>
            </div>
        </main>
    )
}

export default Home