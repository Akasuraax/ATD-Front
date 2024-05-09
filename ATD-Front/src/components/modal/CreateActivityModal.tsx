'use client';

import {CustomFlowbiteTheme, Modal, Spinner, Textarea} from 'flowbite-react';
import {IAddActivity} from "../../interfaces/activity";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {ICreatActivityRole, IRoles} from "../../interfaces/role";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {getTypesAll} from "../../apiService/TypeService";
import {useToast} from "../Toast/ToastContex";
import {IType} from "../../interfaces/type";
import {getAllRoles} from "../../apiService/RoleService";
import {isFreeLocal, postActivity} from "../../apiService/ActivityService";
import AddressInput from "../input/AddressInput";
import {useNavigate} from "react-router-dom";
import ActivityRoles from "../Activity/rolesList";
import {getAnnexesAll} from "../../apiService/annexe";
import {getAllWarehouses} from "../../apiService/WarehouseService";


export default function CreateActivivityModal({setOpenModal, start_date, end_date, newActivity}: {
    setOpenModal: (value: boolean) => void,
    start_date: Date,
    end_date: Date,
    newActivity: (activity: IAddActivity) => void
}) {


    function Stepper() {
        return (
            !standBy ? (
                <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base mb-8">
                    <li className={`flex md:w-full items-center ${step >= 0 ? 'text-blue-600 dark:text-blue-500' : ''} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
                        <span
                            className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            {step >= 1 ? (
                <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                     fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                </svg>
            ) : null}
                            {t("createActivity.general")} <span className="hidden sm:inline-flex sm:ms-2"></span>
        </span>
                    </li>
                    <li className={`flex md:w-full items-center ${step >= 1 ? 'text-blue-600 dark:text-blue-500' : ''} after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
        <span
            className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        {step >= 2 ? (
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                        ) : null}
            {t("createActivity.roles")}
            <span className="hidden sm:inline-flex sm:ms-2">Info</span>
        </span>
                    </li>
                    <li className={`flex items-center ${step >= 2 ? 'text-blue-600 dark:text-blue-500' : ''}`}>
                        {step >= 3 ? (
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                        ) : null}
                        Validation
                    </li>
                </ol>
            ) : null
        )
    }

    const {t} = useTranslation();
    const [activity, setActivity] = useState<IAddActivity>({
        title: '',
        description: '',
        address: '',
        start_date: null,
        end_date: null,
        donation: 0,
        type: '',
        public: false,
        roles: [],
        files: [],
        recipes: [],
        annexe: null,
        journeySteps: [],
        vehicle: null,
        products: []
    })
    const [standBy, setStandBy] = useState<boolean>(true)
    const [types, setTypes] = useState<IType[]>([])
    const [step, setStep] = useState<number>(0)
    const [adressType, setAdressType] = useState<boolean>(false)
    const [localFree, setLocalFree] = useState<number>(0)
    const [places, setPlaces] = useState<[]>([])

    const navigate = useNavigate();


    const {pushToast} = useToast();
    const customTheme: CustomFlowbiteTheme['modal'] = {
        "root": {
            "base": "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
            "show": {
                "on": "flex bg-opacity-50 dark:bg-opacity-80",
                "off": "hidden"
            },
        }
    };

    useEffect(() => {
        request()
        setActivity(prevState => ({
            ...prevState,
            start_date: start_date,
            end_date: end_date
        }));
    }, []);

    function nextStep() {
        const type: IType = types.filter(t => t.id === parseInt(activity.type))[0]
        switch (step) {
            case 0 :

                if (activity.title === '') {
                    pushToast({
                        content: t("createActivity.noTitle"),
                        type: "failure"
                    });
                    return
                }
                if (activity.description === '') {
                    pushToast({
                        content: t("createActivity.noDescription"),
                        type: "failure"
                    });
                    return
                }
                if (activity.address === '' && !type.access_to_journey) {
                    pushToast({
                        content: t("createActivity.noAddress"),
                        type: "failure"
                    });
                    return
                }
                // eslint-disable-next-line no-case-declarations
                const type = types.find(t => t.id === activity.type)
                console.log(type)
                if(!type.access_to_journey) isFree()
                break
            case 1 :
                if (activity.roles.length === 0) {
                    pushToast({
                        content: t("createActivity.noRoles"),
                        type: "failure"
                    });
                    return
                }

                // eslint-disable-next-line no-case-declarations
                const err = activity.roles.filter(r => {
                    if (r.limits.min > r.limits.max) {
                        pushToast({
                            content: t("createActivity.RoleNoCompliant") + " " + r.name,
                            type: "failure"
                        });
                        return r
                    }

                    if (r.limits.min === 0) {
                        pushToast({
                            content: t("createActivity.minRoleNoCompliant") + " " + r.name,
                            type: "failure"
                        });
                        return r
                    }
                })
                if (err.length > 0) return
                break
            default :
        }
        setStep(step + 1)
    }

    function previousStep() {
        const type: IType = types.filter(t => t.id === parseInt(activity.type))[0]
        if (step === 5 && type.access_to_warehouse) {
            setStep(4)
            return
        }
        if ((step === 4 || step === 5) && type.access_to_journey) {
            setStep(3)
            return
        }
        if (step === 5) {
            setStep(2)
            return

        }
        if (step > 0)
            setStep(step - 1)
    }

    async function isFree() {
        const res = await isFreeLocal({start_date:activity.start_date, end_date:activity.end_date, address:activity.address},pushToast)
        setLocalFree(res.count)
    }

    async function request() {
        setStandBy(true)
        await getTypeF()
        await getPlaces()
        setStandBy(false)

    }
    async function getTypeF() {
        try {
            const respons = await getTypesAll(pushToast);
            const typesList = respons.types
            if (typesList.length !== 0) {
                setTypes(typesList)
                updateField('type', typesList[0].id)
            } else {
                pushToast({
                    content: "Pas de types",
                    type: "failure"
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    async function getPlaces() {
        try {
            const annexes = await getAnnexesAll(pushToast);
            const warehouse = await getAllWarehouses(pushToast);
            const combinedPlaces = annexes.concat(warehouse);
            if(combinedPlaces.length > 0)
                updateField('address', combinedPlaces[0].address)
            setPlaces(combinedPlaces)
        } catch (error) {
            console.log(error)
        }
    }

    const updateField = (field: string, value: any) => {
        setActivity((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const changeRoles = (roles) => {
        setActivity(prev => ({
            ...prev,
            roles: roles
        }));
    };

    async function save() {
        try {
            newActivity(activity)
            setOpenModal(false)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Modal theme={customTheme} show={true} onClose={() => setOpenModal(false)}>
            <Modal.Header>
                <h3>{t("createActivity.create")}</h3>
            </Modal.Header>

            <Modal.Body>
                <Stepper/>
                {!standBy ? (
                    step === 0 ? (
                        <>
                            <div className="flex justify-between mt-8 p-4">
                                <div>
                                    <label htmlFor="title"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('createActivity.createTitle')}</label>
                                    <input
                                        type="text"
                                        name="title"
                                        required={true}
                                        style={{
                                            borderBottom: '1px solid black',
                                            borderLeft: 'none',
                                            borderRight: 'none',
                                            borderTop: 'none',
                                            margin: '0',
                                            padding: '0',
                                            fontSize: '0.875rem',
                                            width: '100%'
                                        }}
                                        value={activity.title}
                                        onChange={(e) => updateField('title', e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="title"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('createActivity.createType')}</label>
                                    <Select
                                        id="type"
                                        required
                                        value={activity?.type}
                                        onChange={(e) => updateField('type', e.target.value)}
                                    >
                                        {types.map((t) => (
                                            <MenuItem key={t.id}
                                                      value={t.id}>{t.name}</MenuItem>
                                        ))}
                                    </Select>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="description"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('createActivity.createDescription')}</label>
                                <Textarea
                                    style={{
                                        minHeight: "150px",
                                        maxHeight: "500px"
                                    }}
                                    value={activity.description}
                                    onChange={(e) => updateField('description', e.target.value)}
                                    name="description"
                                    required={true}
                                    id="description"
                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder={t("recipe.details") + "..."}>
                                </Textarea>
                                <div className={"mt-4"}>

                                    <label className="inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="" className="sr-only peer"
                                               onChange={() => setAdressType(!adressType)} checked={adressType}/>
                                        <div
                                            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">{t('createActivity.outsideActivity')}</span>
                                    </label>
                                    {adressType ? (
                                        <>
                                            <label htmlFor="address"
                                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('createActivity.address')}</label>
                                            <AddressInput
                                                onAddressSelect={(address) => updateField('address', address.value.description)}
                                            />
                                        </>
                                    ) : (
                                        <div>
                                            <label htmlFor="title"
                                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('createActivity.local')}</label>
                                            <Select
                                                id="type"
                                                required
                                                value={activity?.address}
                                                onChange={(e) => updateField('address', e.target.value)}
                                            >
                                                {places.map((p) => (
                                                    <MenuItem key={p.id}
                                                              value={p.address}>{p.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : step === 1 ? (
                        <ActivityRoles
                            onActivityRolesChange={changeRoles}
                        />
                    ) : step === 2 ? (
                        <>
                            <div className="flex justify-between mt-8 p-4 flex-col">
                                <div className="flex mb-4">
                                    <h5 className="font-semibold text-gray-900 dark:text-white mr-8">Titre
                                        :</h5>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">{activity.title}</p>
                                </div>
                                <h5 className="font-semibold text-gray-900 dark:text-white mr-8">Description</h5>
                                <div
                                    style={{maxHeight: "150px"}}
                                    className="overflow-y-auto scroll-container mb-4">
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">{activity.description}
                                    </p>
                                </div>

                                <h5 className="font-semibold text-gray-900 dark:text-white mr-8">Adresse</h5>
                                <div
                                    style={{maxHeight: "150px"}}
                                    className="overflow-y-auto scroll-container mb-4">
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">{activity.address}
                                        {localFree > 0 ? (
                                            <span className={"text-red-700 m-4"}>{t('createActivity.placeOccupied')}</span>
                                            ) : null }
                                    </p>
                                </div>

                                <h5 className="font-semibold text-gray-900 dark:text-white mr-8 mb-2">Roles</h5>
                                <div
                                    style={{maxHeight: "200px"}}
                                    className="relative scroll-container overflow-x-auto mb-4">
                                    <table
                                        className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead
                                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Minimum
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Maximum
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {activity.roles.map(r =>
                                            <tr key={r.id}
                                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                <th scope="row"
                                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {r.name}
                                                </th>
                                                <td className="px-6 py-4">
                                                    {r.limits.min}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {r.limits.max}
                                                </td>
                                            </tr>
                                        )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    ) : null
                ) : (
                    <div className="flex justify-center mt-8 p-4">
                        <Spinner color="pink" aria-label="Extra large spinner example"
                                 size="xl"/>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <div className="flex justify-between w-full">
                    <button
                        onClick={() => previousStep()}
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        {t("generic.previous")}
                    </button>
                    {step === 2 ? (
                        <button
                            onClick={() => save()}
                            className="text-white bg-green focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex">
                            {t("generic.saveButton")}
                        </button>
                    ) : (
                        <button
                            onClick={() => nextStep()}
                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex">
                            {t("generic.next")}
                        </button>
                    )}
                </div>
            </Modal.Footer>
        </Modal>
    )
}