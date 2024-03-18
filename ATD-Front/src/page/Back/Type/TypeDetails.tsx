import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useToast} from '../../../components/Toast/ToastContex';
import {Spinner} from 'flowbite-react';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import {useTranslation} from "react-i18next";
import DeleteModal from "../../../components/modal/deleteModal";
import {ITypes} from "../../../interfaces/type";
import {deleteType, getType, patchType} from "../../../apiService/TypeService";

export default function TypeDetails(){
    const {typeId} = useParams();
    const [standBy, setStandBy] = useState(true);
    const {pushToast} = useToast();
    const [type, setType] = useState<ITypes | null>(null);
    const [edit, setEdit] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [newTypes, setNewTypes] = useState<ITypes | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const {t} = useTranslation();


    useEffect(() => {
        sendRequest();
    }, []);

    useEffect(() => {
        setIsModified(!isEqual(type, newTypes));
    }, [newTypes]);

    const updateUserField = (field: string, value: any) => {
        setNewTypes((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    async function save() {
        try {
            console.log(newTypes)
            const patchRespons = await patchType(newTypes, pushToast, typeId);
            setType(patchRespons.type);
            setNewTypes(patchRespons.type);
            setEdit(false)
        }catch (error) {
            console.log(error)
        }
    }
    async function sendRequest() {
        setStandBy(true);
        try {
            const response = await getType(typeId, pushToast);
            setType(response)
            setNewTypes(response);
            setStandBy(false);
        } catch (error) {
            setStandBy(true);
        }
    }

    const handleModalClose = async ( valid: boolean) => {
        setIsModalOpen(false)
        if(!valid) return
        try {
            const res = await deleteType(typeId, pushToast)
            console.log(res)
            setNewTypes(res.type);
            setType(res.type);
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
                                <h3 className="text-base font-semibold leading-7 text-gray-900">{t('types.typeDetails') + ' ' + typeId}</h3>
                            </div>
                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('types.name')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end">
                                                {edit ? (
                                                    <input
                                                        type="text"
                                                        style={{
                                                            borderBottom: '1px solid black',
                                                            borderLeft: 'none',
                                                            borderRight: 'none',
                                                            borderTop: 'none',
                                                            margin: '0',
                                                            padding: '0',
                                                            fontSize: '0.875rem'
                                                        }}
                                                        value={newTypes?.name || type.name}
                                                        onChange={(e) => updateUserField('name', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{newTypes && newTypes.name}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('types.description')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end">
                                                {edit ? (
                                                    <input
                                                        type="text"
                                                        style={{
                                                            borderBottom: '1px solid black',
                                                            borderLeft: 'none',
                                                            borderRight: 'none',
                                                            borderTop: 'none',
                                                            margin: '0',
                                                            padding: '0',
                                                            fontSize: '0.875rem'
                                                        }}
                                                        value={newTypes?.description || type.description}
                                                        onChange={(e) => updateUserField('description', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{newTypes.description}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('types.access_to_warehouse')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end">
                                                {edit ? (
                                                    <select
                                                        name="access_to_warehouse"
                                                        style={{
                                                            border: '1px solid black',
                                                            borderRadius: '4px',
                                                            padding: '0.25rem 3rem',
                                                            fontSize: '0.875rem'
                                                        }}
                                                        value={newTypes.access_to_warehouse ? "1" : "0"}
                                                        onChange={(e) => updateUserField('access_to_warehouse', e.target.value === "1")}
                                                    >
                                                        <option value="1">Oui</option>
                                                        <option value="0">Non</option>
                                                    </select>
                                                ) : (
                                                    <span>{newTypes.access_to_warehouse ? "Oui" : "Non"}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('types.access_to_journey')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end">
                                                {edit ? (
                                                    <select
                                                        name="access_to_journey"
                                                        style={{
                                                            border: '1px solid black',
                                                            borderRadius: '4px',
                                                            padding: '0.25rem 3rem',
                                                            fontSize: '0.875rem'
                                                        }}
                                                        value={newTypes.access_to_journey ? "1" : "0"}
                                                        onChange={(e) => updateUserField('access_to_journey', e.target.value === "1")}
                                                    >
                                                        <option value="1">Oui</option>
                                                        <option value="0">Non</option>
                                                    </select>
                                                ) : (
                                                    <span>{newTypes.access_to_journey ? "Oui" : "Non"}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('types.display')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end">
                                                {edit ? (
                                                    <select
                                                        name="display"
                                                        style={{
                                                            border: '1px solid black',
                                                            borderRadius: '4px',
                                                            padding: '0.25rem 3rem',
                                                            fontSize: '0.875rem'
                                                        }}
                                                        value={newTypes.display ? "1" : "0"}
                                                        onChange={(e) => updateUserField('display', e.target.value === "1")}
                                                    >
                                                        <option value="1">Oui</option>
                                                        <option value="0">Non</option>
                                                    </select>
                                                ) : (
                                                    <span>{newTypes.display ? "Oui" : "Non"}</span>
                                                )}

                                            </div>
                                        </dd>
                                    </div>

                                    {edit ? (
                                        <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                            <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('types.image')}</dt>
                                            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                                <div className="flex items-center justify-end">
                                                    <input
                                                        type="file"
                                                        name="type_image"
                                                        required={false}
                                                        onChange={(e) => updateUserField('type_image', e.target.files[0])}
                                                    />
                                                </div>
                                            </dd>
                                        </div>
                                    ) : (
                                        <p></p>
                                    )}

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">{t('user.creationDate')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                <span>{moment(type.created_at).format('DD/MM/yyyy HH:mm')}</span>
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('roles.isArchived')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                <span>{type.archive ? t("generic.yes") : t("generic.no")}</span>
                                            </div>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="m-4 border p-8 rounded-xl shadow-md">
                            <button
                                disabled={type.archive}
                                onClick={() => {
                                    setEdit(!edit);
                                }}
                                className={`block w-full text-white ${type.archive ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-700 cursor-pointer hover:bg-blue-800'}  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>
                                {t('generic.editButton')}
                            </button>

                            <button
                                disabled={type.archive}
                                onClick={() => {
                                    setIsModalOpen(true);
                                }}
                                className={`block w-full focus:outline-none text-white ${type.archive ? 'bg-yellow-100 cursor-not-allowed' : 'bg-yellow-400 cursor-pointer hover:bg-yellow-500'}  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:focus:ring-yellow-900`}>
                                {t('generic.deleteButton')}
                            </button>

                            <button
                                className={`block w-full text-white  ${!isModified ? 'bg-green-200 cursor-not-allowed' : 'bg-green-500 cursor-pointer'}  font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                                disabled={!isModified}
                                onClick={() => {
                                    save();
                                }}
                            >
                                {t('generic.saveButton')}
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