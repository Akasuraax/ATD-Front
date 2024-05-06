import  './home.css'
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
                    <p className="homeText">{homeTextImage}</p>
                    <div className="homeButton">
                        <stripe-buy-button
                            buy-button-id="buy_btn_1OxvlLCJaEDmVxZfQPSs7c9A"
                            publishable-key="pk_test_51Oxs6xCJaEDmVxZfc4ob9XV222gTMvAlfylfBtMblNWx67BvD4neB5Qev1zyqsJzJjLvjyjjYUaLoLA7TLnDuk4a00lbkv2VmZ"
                        >
                        </stripe-buy-button>
                    </div>
                </div>

                <div className="homeBody max-w-screen-xl flex flex-nowrap justify-between mx-auto">
                    <img className="imageHome" src={imageHome} alt=""></img>
                    <div className="pl-16">
                        <h1 className="homeTitle">{homeTitle}</h1>
                        <p className="pt-16">{homeText}</p>
                        <a href="#"
                           className="btn-first hover:bg-[#E84856] mt-8">{infos}</a>
                    </div>
                </div>

                <div className="mt-32">
                    <ActivityComponent></ActivityComponent>
                </div>
            </div>
        </main>
    )
}

export default Home