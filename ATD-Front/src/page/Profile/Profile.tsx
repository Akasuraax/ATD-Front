import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {Datepicker, Spinner} from "flowbite-react";
import moment from "moment/moment";
import OutlinedInput from "@mui/material/OutlinedInput";
import {PaperClipIcon} from "@heroicons/react/20/solid";
import DeleteModal from "../../components/modal/deleteModal";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {useToast} from "../../components/Toast/ToastContex";
import {IUser} from "../../interfaces/user";
import Calendar from "../../components/Calendar/Calendar";
import "./profile.css"

export default function Profile() {

    const {t} = useTranslation();
    const [standBy, setStandBy] = useState(true);
    const {pushToast} = useToast();
    const [user, setUser] = useState<IUser | null>(null);
    const [edit, setEdit] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [newUser, setNewUser] = useState<IUser | null>(null);


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


    return (
        <main className={"bg-gray-50"}>
            <section className="dark:bg-gray-900">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div
                        style={{width:"25vw"}}
                        className="py-8 px-4 mx-auto lg:py-16 ">
                        <div
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
                            <h1 className="text-gray-900 dark:text-white text-3xl md:text-3xl font-extrabold mb-4">Arthur
                                Morelon</h1>
                            <p className="text-m font-normal text-gray-500 dark:text-gray-400 mb-2">
                                <i className="fi fi-bs-marker mr-2"></i>
                                93170
                            </p>
                            <p className="text-m font-normal text-gray-500 dark:text-gray-400 mb-2"><span
                                className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">validé</span>
                            </p>
                            <div className={'mb-8'}></div>
                            <p className="text-m font-normal text-gray-500 dark:text-gray-400 mb-0.5">Addresse</p>
                            <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-4">33bis avenue du
                                général
                                de gaulle</p>

                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">Email</p>
                            <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-4">arthur.morelon@gmail.com</p>

                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">Numéro de
                                telephone</p>
                            <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-4">06.30.23.84.88</p>

                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">Genre</p>
                            <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-4">Homme</p>

                            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">Date de
                                naissance</p>
                            <p className="text-m font-normal text-black-500 dark:text-gray-400">19 avril 2001</p>
                        </div>

                        <div
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
                            <h1 className="text-gray-900 dark:text-white text-3xl md:text-3xl font-extrabold mb-4">Roles</h1>

                            <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-2">Bénévole</p>
                            <p className="text-m font-normal text-black-500 dark:text-gray-400">Bénévole chauffeur</p>

                        </div>

                        <div
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8  md:p-12 mb-8">
                            <h1 className="text-gray-900 dark:text-white text-3xl md:text-3xl font-extrabold mb-4">Fichiers</h1>
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
                            style={{width:"70vw"}}
                            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8 ">
                            <Calendar/>
                        </div>
                    </div>
                </div>
            </section>
        </main>
)
}