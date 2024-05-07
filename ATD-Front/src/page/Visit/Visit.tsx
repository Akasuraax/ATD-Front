import './visit.css'
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useToast} from "../../components/Toast/ToastContex";
import {getVisitedPersonAll} from "../../apiService/UserService";
import {IUser} from "../../interfaces/user";
import {Spinner} from "flowbite-react";
import moment from "moment/moment";
import { Badge } from "flowbite-react";
import { HiCheck, HiClock } from "react-icons/hi";

function Visit() {
    const { t } = useTranslation();
    const pushToast = useToast();
    const [users, setUsers] = useState<IUser[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [standBy, setStandBy] = useState(true);

    useEffect(() => {
        request();
    }, []);

    async function request() {
        setStandBy(true);
        const response = await getVisitedPersonAll(pushToast);
        setUsers(response);
        setStandBy(false);
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentItems = users.slice(startIndex, endIndex);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        const totalPages = Math.ceil(users.length / itemsPerPage);
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <main>
            <div
                style={{width: '80vw'}}
                className="flex flex-wrap min-w-full items-center mx-auto">
                <div
                    className="p-5 mb-4 w-full border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <time className="text-lg font-semibold text-gray-900 dark:text-white">{t('visit.text')} {moment(Date.now()).format("DD/MM/YY")}</time>
                    {!standBy ? (

                        <ol className="mt-3 divide-y divider-gray-200 dark:divide-gray-700">
                            {currentItems.map(u =>
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
                                                {u.visit ? (
                                                    <Badge size="sm" icon={HiCheck} className={"bg-blue-200"} />
                                                    ) : null }
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
                        <p>{users.length}</p>
                        <div>
                            <button type="button"
                                    onClick={() => handleNextPage }
                                    disabled={currentPage === 1}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                <svg className="w-4 h-4 " aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
                                </svg>
                                <span className="sr-only">Icon description</span>
                            </button>
                            <button type="button"
                                    onClick={() => handlePreviousPage}
                                    disabled={currentPage === Math.ceil(users.length / 10)}
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