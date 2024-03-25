import {useEffect, useState} from "react";
import { postDonation } from "../../apiService/DonationService";
import { useToast } from "../Toast/ToastContex";
import { NavLink } from "react-router-dom";

export default function Success() {
    const url = new URL(window.location.href);
    const sessionId = url.searchParams.get('checkout_session_id');
    const { pushToast } = useToast();
    const [isloaded, setLoaded] = useState(false)

    useEffect(() => {
        if(!isloaded){
            sendRequest();
            setLoaded(true);
        }

    }, []);

    async function sendRequest() {
        try {
            const response = await postDonation({ 'checkout_session': sessionId }, pushToast);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <main className="flex items-center justify-center h-screen p-4">
            <div className="rounded shadow-lg ring ring-indigo-600/50 p-8">
                <div className="flex flex-col items-center space-y-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="text-green-600 w-28 h-28" fill="none"
                         viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <h1 className="text-4xl font-bold pt-5">Merci !</h1>
                    <p className={"py-4"}>Un immense merci pour votre généreux don</p>
                    <NavLink to='/'
                             className="inline-flex items-center px-4 py-2 text-white border rounded rounded-full bg-[#F85866] hover:bg-[#E84856] focus:outline-none focus:ring">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3 mr-2" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18"/>
                        </svg>
                        <span className="text-sm font-medium">Retour à l'accueil</span>
                    </NavLink>
                </div>
            </div>
        </main>


    );
}
