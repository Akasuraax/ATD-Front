import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useToast} from '../../../components/Toast/ToastContex';
import {IVehicles} from '../../../interfaces/vehicle';
import {Spinner} from 'flowbite-react';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import {useTranslation} from "react-i18next";
import DeleteModal from "../../../components/modal/deleteModal";
import {deleteVehicle, getVehicle, patchVehicle} from "../../../apiService/vehiclesService";
import {getAnnexesAll} from "../../../apiService/annexe";
import {IAnnexe} from "../../../interfaces/annexe";



export default function VehicleDetails() {
    const {vehiclesId} = useParams();
    const [standBy, setStandBy] = useState(true);
    const {pushToast} = useToast();
    const [vehicle, setVehicle] = useState<IVehicles | null>(null);
    const [edit, setEdit] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [newVehicle, setNewVehicle] = useState<IVehicles | null>(null);
    const [annexe, setAnnexe] = useState<IAnnexe[] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [textModal, setTextModal] = useState();


    const {t} = useTranslation();


    useEffect(() => {
        sendRequest();
        getAnnexesF();
    }, []);

    useEffect(() => {
        setIsModified(!isEqual(vehicle, newVehicle));
    }, [newVehicle]);

    const updateField = (field: string, value: any) => {
        setNewVehicle((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    async function save() {
        try {
            const patchRespons = await patchVehicle(newVehicle, pushToast, vehiclesId);
            setVehicle(patchRespons.vehicle);
            setNewVehicle(patchRespons.vehicle);
            setEdit(false)
        }catch (error) {
            console.log(error)
        }
    }
    async function sendRequest() {
        setStandBy(true);
        try {
            const vehicleRespons = await getVehicle(vehiclesId, pushToast);
            setVehicle(vehicleRespons);
            setNewVehicle(vehicleRespons);
            setStandBy(false);
        } catch (error) {
            setStandBy(true);
        }
    }

    async function getAnnexesF() {
        setStandBy(true);
        try {
            const annexeRespons = await getAnnexesAll( pushToast);
            setAnnexe(annexeRespons);
            setStandBy(false);
        } catch (error) {
            setStandBy(true);
        }
    }

    const handleModalClose = async ( valid: boolean) => {
        setIsModalOpen(false)
        if(!valid) return
        try {
            const res = await deleteVehicle(null, pushToast, vehiclesId)
            setNewVehicle(res.vehicle);
            setVehicle(res.vehicle);
        } catch (error) {
            console.log(error)
        }
        setIsModalOpen(false);
    };


    return (
        <main>
            <div className="flex flex-wrap max-w-full items-center justify-between mx-auto ">
                {!standBy ? (
                    <>
                        <div className="border p-4 rounded-xl shadow-md">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-base font-semibold leading-7 text-gray-900">{t('vehicle.vehicleDetails') + ' ' + vehiclesId}</h3>
                            </div>
                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm  font-medium leading-6 text-gray-900 sm:col-span-1">{t('vehicle.name')}</dt>
                                        <dd className="mt-1 ml-12 text-sm leading-6 text-gray-700 sm:col-span-2">
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
                                                        value={newVehicle?.name}
                                                        onChange={(e) => updateField('name', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{newVehicle.name}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('vehicle.registration')}</dt>
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
                                                        value={newVehicle?.license_plate}
                                                        onChange={(e) => updateField('license_plate', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{newVehicle.license_plate}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('vehicle.avgConsumption')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                {edit ? (
                                                    <input
                                                        type="number"
                                                        style={{
                                                            borderBottom: '1px solid black',
                                                            borderLeft: 'none',
                                                            borderRight: 'none',
                                                            borderTop: 'none',
                                                            margin: '0',
                                                            padding: '0',
                                                            fontSize: '0.875rem'
                                                        }}
                                                        value={newVehicle?.average_consumption}
                                                        onChange={(e) => updateField('average_consumption', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{newVehicle.average_consumption}L</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('vehicle.consumption')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
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
                                                        value={newVehicle?.fuel_type}
                                                        onChange={(e) => updateField('fuel_type', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{newVehicle.fuel_type}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('vehicle.annexe')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                {edit ? (
                                                    <Select
                                                        id="gender"
                                                        required
                                                        value={newVehicle?.annexe.name}
                                                        onChange={(e) => updateField('gender', e.target.value)}
                                                    >
                                                        {annexe.map((a) => (
                                                            <MenuItem key={a.id} value={a.id}>{a.name}</MenuItem>
                                                        ))}

                                                    </Select>
                                                ) : (
                                                    <span>{newVehicle?.annexe.name}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('user.isArchived')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                <span>{vehicle.archive ? t("generic.yes") : t("generic.no")}</span>
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">{t('user.creationDate')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                <span>{moment(newVehicle.created_at).format('DD/MM/yyyy HH:mm')}</span>
                                            </div>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="m-4 border p-8 rounded-xl shadow-md">
                            <button
                                disabled={vehicle.archive}
                                onClick={() => {
                                    setEdit(!edit);
                                }}
                                className={`block w-full text-white ${vehicle.archive ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-700 cursor-pointer hover:bg-blue-800'}  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>
                                {t('generic.editButton')}
                            </button>

                            <button
                                disabled={vehicle.archive}
                                onClick={() => {
                                    setTextModal(t('user.deleteMessage'))
                                    setIsModalOpen(true);
                                }}
                                className={`block w-full focus:outline-none text-white ${vehicle.archive ? 'bg-yellow-100 cursor-not-allowed' : 'bg-yellow-400 cursor-pointer hover:bg-yellow-500'}  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:focus:ring-yellow-900`}>
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
                text={textModal}
                onClose={(valid: boolean) => handleModalClose(valid)}
            />
        </main>
    )
}

