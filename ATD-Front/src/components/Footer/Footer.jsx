import { useEffect} from "react";
import { initFlowbite} from "flowbite";
import {Navigate, NavLink} from "react-router-dom";

function Footer() {

    const name = "Au Temps Donné"
    const signal = "Signaler un problème"
    const mention = "Mentions légales  - Condition d’utilisation"



    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <footer className="bg-[#F1F1F1] shadow dark:bg-gray-800">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <NavLink to="/"
                                                                                          className="hover:underline">{name}.</NavLink><br/>  {mention}.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <NavLink className="hover:underline me-4 md:me-6" to="/Ticket">{signal}</NavLink>
                    </li>
                </ul>
            </div>
        </footer>

    )
}

export default Footer