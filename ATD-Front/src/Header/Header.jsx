import { useEffect} from "react";
import { initFlowbite} from "flowbite";
import logo from '../../files/logo.png'
import burgerBar from '../../files/icones/menu-burger.svg'
import magnifyingGlass from '../../files/icones/chercher.svg'
import './header.css'

function Header() {


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

        <nav className="bg-white  border-gray-200 dark:bg-gray-900 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
                    <img src={logo} className="h-16" alt="Flowbite Logo"/>
                </a>
                <button data-collapse-toggle="navbar-dropdown" type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-dropdown" aria-expanded="false">
                </button>
                <div className="hidden w-full md:block md:w-auto" id="navbar-dropdown">
                    <ul className="flex align-middle items-center flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-12 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                        <li>
                            <a href="#"
                               className="btn-first">{donation}</a>
                        </li>
                        <li>
                            <a href="#"
                               className="btn-sec">{registration}</a>
                        </li>
                        <li>
                            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar">
                                <img src={magnifyingGlass} className="h-10" alt=""/>
                            </button>
                        </li>
                        <li>
                            <button id="dropdownNavbarLink" data-dropdown-toggle="dropdownNavbar">
                                <img src={burgerBar} className="h-10" alt=""/>
                            </button>
                            <div id="dropdownNavbar"
                                 className="z-10 hidden font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400"
                                    aria-labelledby="dropdownLargeButton">
                                    {menu.map(menu => <li>
                                        <a href="#"
                                           className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{menu}</a>
                                    </li>)}

                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>


    )
}

export default Header