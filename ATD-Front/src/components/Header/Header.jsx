import {useEffect} from "react";
import {initFlowbite} from "flowbite";
import './header.css'
import {NavLink, useLocation} from "react-router-dom";
import {useTranslation} from 'react-i18next'
import LanguageSelector from "../LanguageSelector.jsx";
import Logo from "../../../files/image/logo.png"
import {useAuth} from "../../AuthProvider.jsx";
import SidebarComponent from "../sideBar/SidebarComponent";
import burgerMenu from "../../../files/icones/menu-burger.svg"

function Header() {

    const location = useLocation();
    const auth = useAuth();
    const {t} = useTranslation();
    const login = t("header.login");

    const menu = [{
        name: t("header.activity"),
        link: "activity"
    },
        {
            name: t("header.event"),
            link: ""
        },
        {
            name: t("header.local"),
            link: ""
        },
        {
            name: t("header.about"),
            link: ""
        }]

    useEffect(() => {
        initFlowbite();
    }, []);

    return (

        <header>
            <nav className="bg-white border-gray-200 dark:bg-gray-900">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <NavLink to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img className={"logo"} src={Logo} alt="logo"></img>
                    </NavLink>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {location.pathname !== '/login' && auth.token === null ? (
                            <NavLink to="/login" type="button"
                                     className="mr-8 text-white bg-[#F85866] hover:bg-[#E84856] font-medium rounded-lg text-sm px-4 py-3 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
                                {login}
                            </NavLink>
                        ) : null}
                        {auth.token !== null ? (
                            <>
                                <button type="button"
                                        onClick={auth.logOut}
                                        className="mr-8 text-white bg-[#F85866] hover:bg-[#E84856] font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700">
                                    Déconnexion
                                </button>

                            </>
                        ) : null}
                        <div className="text-center">
                            <button
                                className="pl-8"
                                type="button"
                                data-drawer-target="drawer-navigation"
                                data-drawer-show="drawer-navigation"
                                aria-controls="drawer-navigation">
                                <img src={burgerMenu} alt="Burger Menu" style={{width: '36px'}}/>
                            </button>
                        </div>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                         id="navbar">
                        <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {menu.map((menu) => (
                                <li key={menu.name}>
                                    <NavLink to={menu.link}
                                             className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-[#E84856] md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">{menu.name}</NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>
            <SidebarComponent/>
        </header>
    )
}

export default Header