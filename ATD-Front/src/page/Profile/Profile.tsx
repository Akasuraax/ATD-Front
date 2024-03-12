import {PaperClipIcon} from "@heroicons/react/20/solid";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useToast} from "../../components/Toast/ToastContex";
import {IUser} from "../../interfaces/user";
import "./profile.css"
import TimelineCompnent from "../../components/Timeline/Timeline";
import {getUser} from "../../apiService/UserService";
import {Spinner} from "flowbite-react";
import {useParams} from "react-router-dom";
import moment from "moment/moment";

export default function Profile() {

    const {t} = useTranslation();
    const {userId} = useParams();
    const [standBy, setStandBy] = useState(true);
    const {pushToast} = useToast();
    const [user, setUser] = useState<IUser | null>(null);
    const [newUser, setNewUser] = useState<IUser | null>(null);


    useEffect(() => {
        userRequest();
    }, []);

    const renderStatus = (status: number) => {
        switch (status) {
            case 0:
                return <span
                    className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">en attente</span>;
            case 1:
                return <span
                    className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">validé</span>;
            case 2:
                return <span
                    className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">refusé</span>
        }
    };


    async function userRequest() {
        setStandBy(true);
        try {
            const userResponse = await getUser(userId, pushToast);
            setUser(userResponse);
            setNewUser(userResponse);
            setStandBy(false);
        } catch (error) {
            setStandBy(true);
        }
    }


    return (
        <main className={"bg-gray-50"}>
            {standBy ? (
                <div className="m-auto">
                <Spinner color="pink" aria-label="Extra large spinner example" size="xl"/>
                </div>
            ) : (
                <section className="dark:bg-gray-900">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div
                            style={{width: "25vw"}}
                            className="py-8 px-4 mx-auto lg:py-16 ">
                            <div
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
                                <h1 className="text-gray-900 dark:text-white text-3xl md:text-3xl font-extrabold mb-4">{user.name + " " + user.forname}</h1>
                                <p className="text-m font-normal text-gray-500 dark:text-gray-400 mb-2">
                                    <i className="fi fi-bs-marker mr-2"></i>
                                    {user.zipcode}
                                </p>
                                <p className="text-m font-normal text-gray-500 dark:text-gray-400 mb-2">
                                    {renderStatus(user.status)}
                                </p>
                                <div className={'mb-8'}></div>
                                <p className="text-m font-normal text-gray-500 dark:text-gray-400 mb-0.5">{t("user.address")}</p>
                                <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-4">{user.address}</p>

                                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">{t("user.email")}</p>
                                <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-4">{user.email}</p>

                                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">{t("user.phone")}</p>
                                <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-4">{user.phone_number}</p>

                                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">{t("user.gender")}</p>
                                <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-4">{user.gender}</p>

                                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">{t("user.birthdayDate")}</p>
                                <p className="text-m font-normal text-black-500 dark:text-gray-400">{moment(user.birth_date).format('DD/MM/YYYY')}</p>
                            </div>

                            <div
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
                                <h1 className="text-gray-900 dark:text-white text-3xl md:text-3xl font-extrabold mb-4">{t("user.role")}</h1>
                                {user.roles.map((r) => (
                                    <p key={r.id} className="text-m font-normal text-black-500 dark:text-gray-400 mb-2">{r.name}</p>
                                ))}
                            </div>

                            <div
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8  md:p-12 mb-8">
                                <h1 className="text-gray-900 dark:text-white text-3xl md:text-3xl font-extrabold mb-4">{t("user.file")}</h1>
                                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">Revenue
                                    fiscal</p>
                                <div className="divide-y divide-gray-100 rounded-md border mb-4 border-gray-200">
                                    <div className="flex items-center justify-between p-4 text-sm leading-6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400 "
                                                           aria-hidden="true"/>
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2 pl-2">
                                                <span
                                                    className="truncate font-medium">Revenue fiscal.pdf</span>
                                                <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 pl-2 flex-shrink-0">
                                            <button>Télécharger</button>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">Permis</p>
                                <div className="divide-y divide-gray-100 rounded-md border mb-4 border-gray-200">
                                    <div className="flex items-center justify-between p-4 text-sm leading-6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400 "
                                                           aria-hidden="true"/>
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2 pl-2">
                                                <span
                                                    className="truncate font-medium">Permis.pdf</span>
                                                <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 pl-2 flex-shrink-0">
                                            <button>Télécharger</button>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">Cassier
                                    judiciaire</p>
                                <div className="divide-y divide-gray-100 rounded-md border mb-4 border-gray-200">
                                    <div className="flex items-center justify-between p-4 text-sm leading-6">
                                        <div className="flex w-0 flex-1 items-center">
                                            <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400 "
                                                           aria-hidden="true"/>
                                            <div className="ml-4 flex min-w-0 flex-1 gap-2 pl-2">
                                                <span
                                                    className="truncate font-medium">Cassier judiciaire.pdf</span>
                                                <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                            </div>
                                        </div>
                                        <div className="ml-4 pl-2 flex-shrink-0">
                                            <button>Télécharger</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="py-8 px-4 mx-auto lg:py-16 ">
                            <div
                                style={{width: "70vw"}}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8 ">
                                <h1 className="text-gray-900 dark:text-white text-3xl md:text-3xl font-extrabold mb-8">évenement
                                    a venir</h1>
                                <TimelineCompnent/>
                            </div>
                            <div
                                style={{width: "70vw"}}
                                className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8 ">
                                <h1 className="text-gray-900 dark:text-white text-3xl md:text-3xl font-extrabold mb-8">évenement
                                    a venir</h1>
                                <TimelineCompnent/>
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </main>
    )
}