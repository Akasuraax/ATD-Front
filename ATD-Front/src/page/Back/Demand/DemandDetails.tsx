import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useToast} from "../../../components/Toast/ToastContex";
import {IDemand} from "../../../interfaces/demand";
import {useTranslation} from "react-i18next";
import {deleteDemand, getDemand} from "../../../apiService/DemandService";
import moment from "moment/moment";
import {Spinner} from "flowbite-react";
import DeleteModal from "../../../components/modal/deleteModal";
import isEqual from 'lodash/isEqual';

export default function DemandDetails(){
    const {demandId} = useParams();
    const [standBy, setStandBy] = useState(true);
    const {pushToast} = useToast();
    const [demand, setDemand] = useState<IDemand | null>(null);
    const [edit, setEdit] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [newDemand, setNewDemand] = useState<IDemand | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataGrid, setDataGrid] = useState({});
    const {t} = useTranslation();

    useEffect(() => {
        sendRequest();
    }, [dataGrid]);

    useEffect(() => {
        setIsModified(!isEqual(demand, newDemand));
    }, [newDemand]);

    async function sendRequest() {
        setStandBy(true);
        try {
            const response = await getDemand(demandId, pushToast);
            setDemand(response[0])
            setNewDemand(response[0])
            setStandBy(false);
        } catch (error) {
            setStandBy(true);
        }
    }

    const handleModalClose = async ( valid: boolean) => {
        setIsModalOpen(false)
        if(!valid) return
        try {
            const res = await deleteDemand(pushToast,demandId)
            setNewDemand(res.demand);
            setDemand(res.demand);
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
                                <h3 className="text-base font-semibold leading-7 text-gray-900">{t('demands.demandDetails') + ' ' + demandId}</h3>
                            </div>
                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('demands.type_name')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end">
                                                <span>{newDemand.type.name}</span>
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('demands.description')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                <span>{newDemand.description}</span>
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('demands.user_email')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                <span>{newDemand.user.email}</span>
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">{t('demands.creationDate')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                <span>{moment(newDemand.created_at).format('DD/MM/yyyy HH:mm')}</span>
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('demands.isArchived')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                <span>{newDemand.archive ? t("generic.yes") : t("generic.no")}</span>
                                            </div>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="m-4 border p-8 rounded-xl shadow-md">
                            <button
                                disabled={newDemand.archive}
                                onClick={() => {
                                    setIsModalOpen(true);
                                }}
                                className={`block w-full focus:outline-none text-white ${newDemand.archive ? 'bg-yellow-100 cursor-not-allowed' : 'bg-yellow-400 cursor-pointer hover:bg-yellow-500'}  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:focus:ring-yellow-900`}>
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
                text="yo"
                onClose={(valid: boolean) => handleModalClose(valid)}
            />
        </main>
    )
}