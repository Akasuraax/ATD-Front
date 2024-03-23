import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useToast} from '../../../components/Toast/ToastContex';
import {Spinner} from 'flowbite-react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import isEqual from 'lodash/isEqual';
import {useTranslation} from "react-i18next";
import DeleteModal from "../../../components/modal/deleteModal";
import {IWarehouse} from "../../../interfaces/warehouse";
import {getLanguage, deleteLanguage} from "../../../apiService/LanguageService";
import {PaperClipIcon} from "@heroicons/react/20/solid";
import {fetchTranslation} from "../../../../src/apiService/translationService";

export default function LanguageDetails() {
    const {abbreviation} = useParams();
    const [standBy, setStandBy] = useState(true);
    const {pushToast} = useToast();
    const [language, setLanguage] = useState<IWarehouse | null>(null);
    const [edit, setEdit] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [newLanguage, setNewWarehouse] = useState<IWarehouse | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const {t} = useTranslation();
    const link = "/storage/languages/" + abbreviation + "/translation.json"

    useEffect(() => {
        sendRequest();
    }, []);

    useEffect(() => {
        setIsModified(!isEqual(language, newLanguage));
    }, [newLanguage]);

    const updateUserField = (field: string, value: any) => {
        setNewWarehouse((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    async function sendRequest() {
        setStandBy(true);
        try {
            const response = await getLanguage(abbreviation, pushToast);
            setLanguage(response)
            setNewWarehouse(response);
            setStandBy(false);
        } catch (error) {
            setStandBy(true);
        }
    }

    async function getFile(abbreviation){
        try {
            const res = await fetchTranslation(abbreviation);
            const jsonStr = JSON.stringify(res, null, 2);

            const blob = new Blob([jsonStr], { type: 'application/json' });

            const fileUrl = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = fileUrl;
            link.setAttribute('download', 'translation.json');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(fileUrl);
        } catch (error) {
            console.log(error);
        }


    }

    const handleModalClose = async ( valid: boolean) => {
        setIsModalOpen(false)
        if(!valid) return
        try {
            const res = await deleteLanguage(pushToast,abbreviation);
            setNewWarehouse(res.language);
            setLanguage(res.language);
            navigate(`/back/languages`)
        } catch (error) {
            console.log(error)
        }
        setIsModalOpen(false);
    };


    return (
        <main>
            <div className="flex flex-wrap max-w-full items-center justify-between mx-auto">
                {!standBy ? (
                    <>
                        <div className="border p-4 rounded-xl shadow-md">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-base font-semibold leading-7 text-gray-900">{t('languages.' + abbreviation)}</h3>
                            </div>
                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('languages.abbreviation')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end">
                                                <span>{abbreviation}</span>
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="border-t border-gray-100">
                                        <dd className="mt-6 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div
                                                className="divide-y divide-gray-100 rounded-md border mb-4 border-gray-200">
                                                <div
                                                    className="flex items-center justify-between p-4 text-sm leading-6">
                                                    <div className="flex w-0 flex-1 items-center">
                                                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400 "
                                                                       aria-hidden="true"/>
                                                        <div className="ml-4 flex min-w-0 flex-1 gap-2 pl-2">
                                                            <span
                                                                className="truncate font-medium">{link.replace(/.*\//, '')}</span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4 pl-2 flex-shrink-0">
                                                        <button
                                                            onClick={() => getFile(abbreviation)}>
                                                            <svg className="w-6 h-6 text-gray-800 dark:text-white"
                                                                 aria-hidden="true"
                                                                 xmlns="http://www.w3.org/2000/svg" width="24"
                                                                 height="24"
                                                                 fill="none"
                                                                 viewBox="0 0 24 24">
                                                                <path stroke="currentColor" strokeLinecap="round"
                                                                      strokeLinejoin="round"
                                                                      strokeWidth="2"
                                                                      d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"/>
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="m-4 border p-8 rounded-xl shadow-md">
                            <button
                                disabled={language.archive}
                                onClick={() => {
                                    setIsModalOpen(true);
                                }}
                                className={`block w-full focus:outline-none text-white ${language.archive ? 'bg-yellow-100 cursor-not-allowed' : 'bg-yellow-400 cursor-pointer hover:bg-yellow-500'}  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:focus:ring-yellow-900`}>
                                {t('generic.deleteButton')}
                            </button>

                        </div>
                    </>
                ) : (
                    <Spinner color="pink" aria-label="Extra large spinner example" size="xl"/>
                )}
            </div>
            <DeleteModal
                openModal={isModalOpen}
                text={t('languages.confirmDelete')}
                onClose={(valid: boolean) => handleModalClose(valid)}
            />
        </main>
    )
}

