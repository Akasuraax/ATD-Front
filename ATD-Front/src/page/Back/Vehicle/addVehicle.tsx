import {useEffect, useState} from 'react';
import {useToast} from '../../../components/Toast/ToastContex';
import {Spinner} from 'flowbite-react';
import {useTranslation} from "react-i18next";
import {useNavigate} from 'react-router-dom';
import {postVehicle} from "../../../apiService/vehiclesService";
import {IAddVehicle} from "../../../interfaces/vehicle";
import {getAnnexesAll} from "../../../apiService/annexe";
import {IAnnexe} from "../../../interfaces/annexe";
import * as React from "react";
import Select from "@mui/material/Select";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";


export default function AddVehicle() {
    const {pushToast} = useToast();
    const navigate = useNavigate();
    const [standBy, setStandBy] = useState(true);
    const [vehicle, setVehicle] = useState<IAddVehicle | null>({
            name: '',
            license_plate: '',
            average_consumption: 0,
            partner: false,
            fuel_type: '',
            id_annexe: 1
        }
    );
    const [annexe, setAnnexes] = useState<IAnnexe[]>(null);
    const {t} = useTranslation();

    const updateVehicleField = (field: string, value: any) => {
        setVehicle((prevVehicle) => ({
            ...prevVehicle,
            [field]: value,
        }));
    };

    async function save(e) {
        e.preventDefault();
        const form = e.target;
        const vehicle: IAddVehicle = {
            name: form.elements["name"].value,
            license_plate: form.elements["license_plate"].value,
            average_consumption: Number(form.elements["average_consumption"].value),
            fuel_type: form.elements["fuel_type"].value,
            partner: form.elements["partner"].value,
            id_annexe: Number(form.elements["id_annexe"].value),
        }
        try {
            const respons = await postVehicle(vehicle, pushToast);
            if(respons.status === 409){
                pushToast({
                    content:"Cette plaque d'immatriculation existe déjà",
                    type:"failure"
                })
            }
            if(respons.status === 201)
                navigate(`/back/vehicles`)
        } catch (error) {
            return
        }
    }

    useEffect(() => {
        getAnnexesF();
    }, []);

    async function getAnnexesF() {
        setStandBy(true);
        try {
            const annexeResponse = await getAnnexesAll(pushToast);
            setAnnexes(annexeResponse);
            setStandBy(false);
        } catch (error) {
            setStandBy(true);
        }
    }

    return (
        <main>
            <div className="flex flex-wrap max-w-full items-center justify-between mx-auto">
                <div
                    style={{minWidth: "30vw"}}
                    className="border p-4 rounded-xl shadow-md">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">{t('vehicle.addBtn')}</h3>
                    </div>
                    <form onSubmit={save}>
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('vehicle.name')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end">
                                            <input
                                                type="text"
                                                name="name"
                                                maxLength={255}
                                                required={true}
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    borderLeft: 'none',
                                                    borderRight: 'none',
                                                    borderTop: 'none',
                                                    margin: '0',
                                                    padding: '0',
                                                    fontSize: '0.875rem'
                                                }}
                                                value={vehicle.name}
                                                onChange={(e) => updateVehicleField('name', e.target.value)}
                                            />
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('vehicle.license_plate')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end ">
                                            <input
                                                type="text"
                                                required={true}
                                                minLength={9}
                                                maxLength={9}
                                                pattern="[A-Za-z0-9]{2}-[A-Za-z0-9]{3}-[A-Za-z0-9]{2}"
                                                name="license_plate"
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    borderLeft: 'none',
                                                    borderRight: 'none',
                                                    borderTop: 'none',
                                                    margin: '0',
                                                    padding: '0',
                                                    fontSize: '0.875rem'
                                                }}
                                                value={vehicle.license_plate}
                                                onChange={(e) => updateVehicleField('license_plate', e.target.value)}
                                            />
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('vehicle.avgConsumption')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end ">
                                            <input
                                                type="number"
                                                name="average_consumption"
                                                required={true}
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    borderLeft: 'none',
                                                    borderRight: 'none',
                                                    borderTop: 'none',
                                                    margin: '0',
                                                    padding: '0',
                                                    fontSize: '0.875rem'
                                                }}
                                                value={vehicle.average_consumption}
                                                pattern="[1-9]{5}"
                                                onChange={(e) => updateVehicleField('average_consumption', e.target.value.slice(0, 5).replace(/\D/g, ''))}
                                            />
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('vehicle.partner')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end ">
                                            <select
                                                name="partner"
                                                required={true}
                                                style={{
                                                    border: '1px solid black',
                                                    borderRadius: '4px',
                                                    padding: '0.25rem 3rem',
                                                    fontSize: '0.875rem'
                                                }}
                                                value={vehicle.partner ? "1" : "0"}
                                                onChange={(e) => updateVehicleField('partner', e.target.value === "1")}
                                            >
                                                <option value="1">Oui</option>
                                                <option value="0">Non</option>
                                            </select>
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('vehicle.fuel_type')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end ">
                                            <input
                                                type="text"
                                                required={true}
                                                name="fuel_type"
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    borderLeft: 'none',
                                                    borderRight: 'none',
                                                    borderTop: 'none',
                                                    margin: '0',
                                                    padding: '0',
                                                    fontSize: '0.875rem'
                                                }}
                                                value={vehicle.fuel_type}
                                                onChange={(e) => updateVehicleField('fuel_type', e.target.value)}
                                            />
                                        </div>
                                    </dd>
                                </div>
                                {!standBy ? (
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('vehicle.annexe')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                <select
                                                    id="id_annexe"
                                                    name="id_annexe"
                                                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                                    value={vehicle.id_annexe}
                                                    onChange={(e) => updateVehicleField('id_annexe', e.target.value)}
                                                    required
                                                >
                                                    <option value=""></option>
                                                    {annexe.map((t) => (
                                                        <option value={t.id} key={t.id}>{t.name}</option>
                                                    ))}
                                                </select>
                                            </div>
                                        </dd>
                                    </div>
                                ) : (
                                    <Spinner color="pink" aria-label="Extra large spinner example" size="xl"/>
                                )}
                            </dl>
                        </div>
                        <button
                            style={{backgroundColor: "#6AAF5C"}}
                            className={`block m-4 text-white cursor-pointer font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                            type="submit"
                        >
                            {t('generic.saveButton')}
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}

