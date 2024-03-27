import './visit.css'
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useToast} from "../../components/Toast/ToastContex";
import {getVisitedPerson} from "../../apiService/UserService";
import {IUser} from "../../interfaces/user";
import {Spinner} from "flowbite-react";

function Visit() {

    const {t} = useTranslation();
    const pushToast = useToast()
    const [data, setDate] = useState({
        current_page: 1,
        per_page: 10,
        last_page: 0,
        total: 0
    })
    const [users, setUsers] = useState<IUser[]>([])
    const [standBy, setStandBy] = useState<boolean>(true)

    useEffect(() => {
        request()
    }, []);

    async function request() {
        setStandBy(true)
        const response = await getVisitedPerson(data, pushToast)
        console.log(response)
        setUsers(response.data)
        setStandBy(false)

    }

    return (
        <main>
            <div className="m-auto content max-w-screen-xl">
                {!standBy ? (
                    <div
                        className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                        <time className="text-lg font-semibold text-gray-900 dark:text-white">January 13th, 2022</time>
                        <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                            {users.map(u =>
                                <li key={u.id}>
                                    <div
                                        className=" p-6 block sm:flex hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="text-gray-600 dark:text-gray-400">
                                            <div className="flex items-end">
                                                <div className="text-base font-normal"><span
                                                    className="font-medium text-gray-900 dark:text-white">{u.name} {u.forname}</span>
                                                    <span
                                                        className="p-4 text-sm font-normal">{u.address}</span>
                                                </div>
                                                <span
                                                    className="justify-self-end inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                                                    <span className="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                                                    Available
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                                )}
                        </ol>
                    </div>
                    ) : (
                    <Spinner color="pink" aria-label="Extra large spinner example" size="xl"/>
                    )}
            </div>


        </main>
    );
}

export default Visit;