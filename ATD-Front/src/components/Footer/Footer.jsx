import { useEffect} from "react";
import { initFlowbite} from "flowbite";

function Footer() {

    const name = "Au Temps Donné"
    const signal = "Signaler un problème"
    const mention = "Mentions légales  - Condition d’utilisation"



    useEffect(() => {
        initFlowbite();
    }, []);

    return (
        <footer className="bg-[#F1F1F1] mt-32 shadow dark:bg-gray-800 w-full h-16 sticky top-[100vh]">
            <div className="w-full mx-auto max-w-screen-xl md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="#"
                                                                                          className="hover:underline">{name}.</a><br/>  {mention}.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">{signal}</a>
                    </li>
                </ul>
            </div>
        </footer>

    )
}

export default Footer