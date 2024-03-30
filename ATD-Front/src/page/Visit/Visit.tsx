import './visit.css'
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useToast} from "../../components/Toast/ToastContex";
import {getVisitedPerson} from "../../apiService/UserService";
import {IUser} from "../../interfaces/user";
import {Spinner} from "flowbite-react";
import moment from "moment/moment";

function Visit() {

    const {t} = useTranslation();
    const pushToast = useToast()
    const [data, setData] = useState({
        last_page: 0,
        total: 0,
        to: 0
    })
    const [current_page, setCurrent_Page] = useState<number>(0)
    const [users, setUsers] = useState<IUser[]>([])
    const [standBy, setStandBy] = useState<boolean>(true)

    useEffect(() => {
        request()
    }, [current_page]);

    async function request() {
        setStandBy(true)
        const response = await getVisitedPerson({page: current_page}, pushToast)
        setData({
            last_page: response.last_page,
            total: response.total,
            to: response.to
        })
        setUsers(response.data)
        setStandBy(false)
    }

    async function setDataF(value) {
        if (current_page == 0 && value === -1) return
        if (data.to === data.total && value === +1) return
        setCurrent_Page(current_page + value)
    }

    return (
        <main>
            <div className="m-auto content max-w-screen-xl">
                <div
                    className="p-5 mb-4 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <time className="text-lg font-semibold text-gray-900 dark:text-white">{t('visit.text')} {moment(Date.now()).format("DD/MM/YY")}</time>
                    {!standBy ? (

                        <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                            {users.map(u =>
                                <li key={u.id}>
                                    <div
                                        className=" p-6 block sm:flex hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <div className="text-gray-600 dark:text-gray-400">
                                            <div
                                                style={{justifyContent: "space-evenly"}}
                                                className="flex">
                                                <span
                                                    className="font-medium text-gray-900 dark:text-white">{u.name} {u.forname}</span>
                                                <span
                                                    className=" text-sm font-normal">{u.address}</span>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )}
                        </ol>
                    ) : (
                        <div
                            className={"text-center flex flex-col justify-center"}
                            style={{height:"741px"}}>
                            <Spinner color="pink" aria-label="Extra large spinner example" size="xl"/>
                        </div>
                    )}

                    <div className={"flex justify-between"}>
                        <p>{data.to} / {data.total}</p>
                        <div>
                            <button type="button"
                                    onClick={() => setDataF(-1)}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4 " aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                                </svg>
                                <span className="sr-only">Icon description</span>
                            </button>
                            <button type="button"
                                    onClick={() => setDataF(+1)}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="none"
                                     viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                                <span className="sr-only">Icon description</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>


        </main>
    );
}

export default Visit;