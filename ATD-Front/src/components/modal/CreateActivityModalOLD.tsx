'use client';

import {CustomFlowbiteTheme, Modal, Spinner, Textarea} from 'flowbite-react';
import {IAddActivity} from "../../interfaces/activity";
import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {ICreatActivityRole, IRole} from "../../interfaces/role";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {getTypesAll} from "../../apiService/TypeService";
import {useToast} from "../Toast/ToastContex";
import {IType} from "../../interfaces/type";
import {getAllRoles} from "../../apiService/RoleService";
import {FileInput, Label} from 'flowbite-react';
import {PaperClipIcon} from "@heroicons/react/20/solid";
import {getMaxRecipe, getRecipesFilter} from "../../apiService/RecipeService";
import {IActivityRecipe, IRecipe} from "../../interfaces/recipe";
import {postActivity, routePlanner} from "../../apiService/ActivityService";
import {postAddress} from "../../apiService/address";
import AddressInput from "../input/AddressInput";
import {getAllWarehouses} from "../../apiService/WarehouseService";
import {IWarehouse} from "../../interfaces/warehouse";
import {getAllVehicles} from "../../apiService/vehiclesService";
import {getAnnexesAll} from "../../apiService/annexe";
import {IAnnexes} from "../../interfaces/annexe";


export default function CreateActivivityModal({setOpenModal, start_date, end_date}: {
    setOpenModal: (value: boolean) => void,
    start_date: Date,
    end_date: Date
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
                    <li className={`flex md:w-full items-center ${step >= 2 ? 'text-blue-600 dark:text-blue-500' : ''} after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
        <span
            className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        {step >= 3 ? (
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                        ) : null}
            {t("createActivity.files")}
            <span className="hidden sm:inline-flex sm:ms-2">Info</span>
        </span>
                    </li>

                    {types.filter(t => t.id === parseInt(activity.type))[0].access_to_journey ? (
                        <li className={`flex md:w-full items-center ${step >= 3 ? 'text-blue-600 dark:text-blue-500' : ''} after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
        <span
            className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        {step >= 4 ? (
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                        ) : null}
            trajets
            <span className="hidden sm:inline-flex sm:ms-2">Info</span>
        </span>
                        </li>
                    ) : null}

                    {types.filter(t => t.id === parseInt(activity.type))[0].access_to_warehouse ? (
                        <li className={`flex md:w-full items-center ${step >= 4 ? 'text-blue-600 dark:text-blue-500' : ''} after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`}>
        <span
            className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
                        {step >= 5 ? (
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                        ) : null}
            recettes
            <span className="hidden sm:inline-flex sm:ms-2">Info</span>
        </span>
                        </li>
                    ) : null}

                    <li className={`flex items-center ${step >= 5 ? 'text-blue-600 dark:text-blue-500' : ''}`}>
                        {step >= 6 ? (
                            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="currentColor" viewBox="0 0 20 20">
                                <path
                                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
                            </svg>
                        ) : null}
                        {t("createActivity.validation")}
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
    })
    const [standBy, setStandBy] = useState<boolean>(true)
    const [types, setTypes] = useState<IType[]>([])
    const [warehouses, setWarehouses] = useState<IWarehouse[]>([])
    const [roles, setRoles] = useState<IRole[]>([])
    const [annexes, setAnnexes] = useState<IAnnexes[]>([])
    const [addressAnnexe, setAddressAnnexe] = useState<string>('')
    const [addressWarehouse, setAddressWarehouse] = useState<string>('')
    const [recipes, setRecipes] = useState<IRecipe[]>([])
    const [step, setStep] = useState<number>(0)
    const [filter, setFilter] = useState<string>('');


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
        getTypeF()
        getRoleF()
        getRecipesF()
        getWarehouseF()
        getAnnexeF()
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
            case 2 :
                if (type.access_to_journey) setStep(3)
                else if (type.access_to_warehouse) setStep(4)
                else setStep(5)
                return

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

    async function getTypeF() {
        setStandBy(true)
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
            setStandBy(false)

        } catch (error) {
            console.log(error)
        }
    }

    async function getWarehouseF() {
        setStandBy(true)
        try {
            const respons = await getAllWarehouses(pushToast);

            if (respons.length !== 0) {
                setWarehouses(respons)
                setAddressWarehouse(respons[0].address)
            } else {
                pushToast({
                    content: "Pas d'entrepot",
                    type: "failure"
                });
            }
            setStandBy(false)

        } catch (error) {
            console.log(error)
        }
    }

    async function getAnnexeF() {
        setStandBy(true)
        try {
            const respons = await getAnnexesAll(pushToast);
            if (respons.length !== 0) {
                setAnnexes(respons)
                setAddressAnnexe(respons[0].address)
            } else {
                pushToast({
                    content: "Pas d'annexe",
                    type: "failure"
                });
            }
            setStandBy(false)

        } catch (error) {
            console.log(error)
        }
    }

    async function getRoleF() {
        setStandBy(true)
        try {
            const rolesList = await getAllRoles(null, pushToast);
            if (rolesList.length !== 0) {
                setRoles(rolesList)
            } else {
                pushToast({
                    content: "Pas de roles",
                    type: "failure"
                });
            }
            setStandBy(false)

        } catch (error) {
            console.log(error)
        }
    }

    async function getRecipesF() {
        setStandBy(true)
        try {
            const recipesList = await getRecipesFilter(pushToast);
            if (recipesList.length !== 0) {
                setRecipes(recipesList)
            } else {
                pushToast({
                    content: "Pas de recettes",
                    type: "failure"
                });
            }
            setStandBy(false)
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

    const addRole = (r: IRole) => {
        const roleToAdd: ICreatActivityRole = {
            id: r.id,
            name: r.name,
            limits: {
                max: 1,
                min: 1
            }
        };

        setActivity((prev) => ({
            ...prev,
            roles: [...prev.roles, roleToAdd],
        }));
    };

    const addRecipe = async (r: IRecipe) => {
        try {
            const max = await getMaxRecipe(r.id, pushToast);

            const recipeToAdd: IActivityRecipe = {
                id: r.id,
                name: r.name,
                count: 0,
                products: r.products,
                max:max
            };

            setActivity((prev) => ({
                ...prev,
                recipes: [...prev.recipes, recipeToAdd],
            }));
        } catch (error) {
            console.error("Une erreur s'est produite lors de l'ajout de la recette:", error);
            pushToast("Une erreur s'est produite lors de l'ajout de la recette.");
        }
    };

    const remove = (id: number, field: string) => {
        setActivity((prevActivity) => ({
            ...prevActivity,
            [field]: prevActivity[field].filter(v => v.id !== id),
        }));
    };

    const updateCountRoles = (type: string, value: number, roleId: number) => {
        setActivity((prevActivity) => ({
            ...prevActivity,
            roles: prevActivity.roles.map(role => {
                if (role.id === roleId) {
                    value = value > 999 ? 999 : value
                    value = value < 0 ? 0 : value
                    type === "max" ? role.limits.max = value : role.limits.min = value;
                }
                return role;
            }),
        }));
    }

    const handleDrop = (event) => {
        event.preventDefault();
        const files: File[] = event.dataTransfer.files;
        const filesArray = Array.from(files);
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        const verify = filesArray.filter(f => {
            if (f.size > 20971520) {
                pushToast({
                    content: "La taille du fichier dépasse 20Mo",
                    type: "failure"
                });
                return;
            } else if (!allowedTypes.includes(f.type)) {
                pushToast({
                    content: "Type de fichier non pris en charge",
                    type: "failure"
                });
                return;
            }
            return f;
        })

        const uniqueFiles = verify.filter(file => activity.files.some(existingFile => existingFile.name === file.name));
        if (uniqueFiles.length === 0) {
            setActivity(prevActivity => ({
                ...prevActivity,
                files: [...prevActivity.files, ...verify]
            }));
        } else {
            pushToast({
                content: "Le nom du file est déja pris",
                type: "failure"
            });
        }
    };

    const removeFile = (name: string) => {
        setActivity(prevActivity => ({
            ...prevActivity,
            files: prevActivity.files.filter(f => f.name !== name)
        }));
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    async function getRecipes() {
        try {
            const productsRespons = await getRecipesFilter({filter: filter});
            setRecipes(productsRespons)
        } catch (error) {
            console.log(error)
        }
    }

    const updateCountRecipes = (value: number, Id: number) => {
        setActivity((prevActivity) => ({
            ...prevActivity,
            recipes: prevActivity.recipes.map(recipe => {
                if (recipe.id === Id) {
                    value = value > 0 ? value : 0
                    recipe.count = value
                }
                return recipe;
            }),
        }));
    }

    const updateAnnexe = (value) => {
        const annexe = annexes.find(w => w.id === value);

        if (annexe) {
            setActivity((prevActivity) => ({
                ...prevActivity,
                annexe: annexe,
            }));
        }
    }

    async function save() {
        console.log(activity)

        try {
            const respons = await postActivity(activity, pushToast);
            console.log(respons)
        } catch (error) {
            console.log(error)
        }
    }

    const addAddressToJourney = (a) => {
        setActivity((prevActivity) => ({
            ...prevActivity,
            journeySteps: [...activity.journeySteps, a.label]
        }));
    }

    async function itinerary() {
        let itinerary = []
        if(types.filter(t => t.id === parseInt(activity.type))[0].access_to_warehouse)
            itinerary = [addressWarehouse, ...activity.journeySteps];
        else {
            itinerary = [addressAnnexe, ...activity.journeySteps];
        }
        try {
            const respons = await routePlanner({steps:itinerary}, pushToast);
            console.log(respons)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteStep = (s) => {
        setActivity((prevActivity) => ({
            ...prevActivity,
            journeySteps: prevActivity.journeySteps.filter(step => step !== s)
        }));
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
                                        id="gender"
                                        required
                                        value={activity?.type}
                                        onChange={(e) => updateField('type', e.target.value)}
                                    >
                                        {types.map((t) => (
                                            <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>
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
                                {!types.filter(t => t.id === parseInt(activity.type))[0].access_to_journey ? (
                                    <div className={"mt-4"}>
                                        <label htmlFor="address"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('createActivity.address')}</label>
                                        <AddressInput
                                            onAddressSelect={(address) => updateField('address', address.value.description)}
                                            address={activity?.address}
                                        />
                                    </div>
                                ) : null}
                            </div>
                        </>
                    ) : step === 1 ? (
                        <>
                            <div className="m-4">
                                <h3>{t("roles.roles")}</h3>
                                <div style={{maxHeight: '250px', overflowY: 'auto', paddingRight:'20px'}}>
                                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {roles
                                            .filter(r => !activity.roles.some(role => role.id === r.id))
                                            .map((r) => (
                                                <li key={r.id} className="py-3 sm:py-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="min-w-0 ms-4">
                                                            <p className="justify-between font-medium text-gray-900 truncate dark:text-white">
                                                                {r.name}
                                                            </p>
                                                        </div>
                                                        <button onClick={() => addRole(r)}>
                                                            <i className="fi fi-rr-plus"></i>
                                                        </button>
                                                    </div>
                                                </li>
                                            ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                <table
                                    className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead
                                        className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            {t('createActivity.createType')}
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            {t('createActivity.minimum')}
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            {t('createActivity.maximum')}
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            {t('createActivity.action')}
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {activity.roles.map((r) => (
                                        <tr key={r.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                {r.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() => (updateCountRoles("min", r.limits.min - 1, r.id))}
                                                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                        type="button">
                                                        <span className="sr-only">Quantity button</span>
                                                        <svg className="w-3 h-3" aria-hidden="true"
                                                             xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 18 2">
                                                            <path stroke="currentColor" strokeLinecap="round"
                                                                  strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                                        </svg>
                                                    </button>
                                                    <div>
                                                        <input type="number" id="first_product"
                                                               max={999}
                                                               min={0}
                                                               value={r.limits.min}
                                                               onChange={(e) => (updateCountRoles("min", parseInt(e.target.value), r.id))}
                                                               className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                               placeholder="1" required/>
                                                    </div>
                                                    <button
                                                        onClick={() => (updateCountRoles("min", r.limits.min + 1, r.id))}
                                                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                        type="button">
                                                        <span className="sr-only">Quantity button</span>
                                                        <svg className="w-3 h-3" aria-hidden="true"
                                                             xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 18 18">
                                                            <path stroke="currentColor" strokeLinecap="round"
                                                                  strokeLinejoin="round" strokeWidth="2"
                                                                  d="M9 1v16M1 9h16"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() => (updateCountRoles("max", r.limits.max - 1, r.id))}
                                                        className=" inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                        type="button">
                                                        <span className="sr-only">Quantity button</span>
                                                        <svg className="w-3 h-3" aria-hidden="true"
                                                             xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 18 2">
                                                            <path stroke="currentColor" strokeLinecap="round"
                                                                  strokeLinejoin="round" strokeWidth="2" d="M1 1h16"/>
                                                        </svg>
                                                    </button>
                                                    <div>
                                                        <input type="number" id="first_product"
                                                               max={999}
                                                               min={0}
                                                               value={r.limits.max}
                                                               onChange={(e) => (updateCountRoles("max", parseInt(e.target.value), r.id))}
                                                               className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                               placeholder="1" required/>
                                                    </div>
                                                    <button
                                                        onClick={() => (updateCountRoles("max", r.limits.max + 1, r.id))}
                                                        className=" inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                        type="button">
                                                        <span className="sr-only">Quantity button</span>
                                                        <svg className="w-3 h-3" aria-hidden="true"
                                                             xmlns="http://www.w3.org/2000/svg" fill="none"
                                                             viewBox="0 0 18 18">
                                                            <path stroke="currentColor" strokeLinecap="round"
                                                                  strokeLinejoin="round" strokeWidth="2"
                                                                  d="M9 1v16M1 9h16"/>
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => remove(r.id, 'roles')}
                                                    className=" font-medium text-red-600 dark:text-red-500 hover:underline">{t('createActivity.remove')}</button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        </>
                    ) : step === 2 ? (
                        <>
                            <h3>Files</h3>
                            <div className="flex w-full items-center justify-center">
                                <Label
                                    onDrop={handleDrop}
                                    onDragOver={handleDragOver}
                                    htmlFor="dropzone-file"
                                    className="dark:hover:bg-bray-800 flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                    <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                        <svg
                                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span
                                                className="font-semibold">{t('createActivity.upload')}</span> {t('createActivity.drag')}
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, PDF, JPG; JPEG</p>
                                    </div>
                                    <FileInput id="dropzone-file" className="hidden"/>
                                </Label>
                            </div>
                            <div
                                style={{maxHeight: '250px', overflowY: 'auto'}}
                                className="mt-4">
                                {activity.files.map((f) => (
                                    <div key={f.name}
                                         className="divide-y divide-gray-100 rounded-md border mb-4 border-gray-200">
                                        <div className="flex items-center justify-between p-4 text-sm leading-6">
                                            <div className="flex w-0 flex-1 items-center">
                                                <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400 "
                                                               aria-hidden="true"/>
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2 pl-2">
                                                <span
                                                    className="truncate font-medium">{f.name.length > 30 ? `${f.name.slice(0, 30)}...` : f.name}</span>
                                                    <span
                                                        className="flex-shrink-0 text-gray-400">{(f.size / (1024 * 1024)).toFixed(2)} MB</span>
                                                </div>
                                            </div>
                                            <div className="ml-4 pl-2 flex-shrink-0">
                                                <button
                                                    onClick={() => removeFile(f.name)}
                                                    className=" font-medium text-red-600 dark:text-red-500 hover:underline">{t('createActivity.remove')}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    ) : step === 3 ? (
                        <>
                            <h3>Trajet</h3>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dd className=" mt-1 text-sm leading-6 text-gray-700 sm:col-span-3">
                                    <div>
                                        <h3>Annexe de départ</h3>
                                        <select
                                            value={addressAnnexe}
                                            onChange={(e) => setAddressAnnexe(e.target.value)}>
                                            {annexes.map(w => (
                                                <option key={w.id} value={w.address}>{w.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                    {types.filter(t => t.id === parseInt(activity.type))[0].access_to_warehouse ? (
                                        <div>
                                            <h3>Entrepot</h3>
                                            <select
                                                value={addressWarehouse}
                                                onChange={(e) => setAddressWarehouse(e.target.value)}>
                                                {warehouses.map(w => (
                                                    <option key={w.id} value={w.address}>{w.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ): null}
                                </dd>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3">
                                    <>
                                        {activity.journeySteps.map(s => (
                                            <div key={s} className={"flex justify-between"}>
                                                <p className="mt-4 text-sm font-medium text-gray-900 truncate dark:text-white"
                                                >{s}</p>
                                                <button
                                                    onClick={() => deleteStep(s)}>
                                                    <i className="fi fi-rr-cross"></i>
                                                </button>
                                            </div>
                                        ))}
                                        <AddressInput
                                            onAddressSelect={addAddressToJourney}
                                        />
                                    </>
                                </dd>
                                <button
                                    onClick={() => itinerary()}
                                    className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex">
                                    Calculer itinéraire
                                </button>
                            </div>
                        </>
                    ) : step === 4 ? (
                        <>
                            <h3>Recettes</h3>
                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3">
                    <span
                        className="flex mb-6"
                        style={{
                            borderBottom: '1px solid black',
                        }}
                    >
                    <input
                        type="text"
                        name="name"
                        required={true}
                        style={{
                            borderBottom: '0px solid black',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderTop: 'none',
                            margin: '0',
                            padding: '0',
                            fontSize: '0.875rem',
                            width: '100%'
                        }}
                        value={filter}
                        onKeyDown={(e) => e.key === 'Enter' ? getRecipes() : null}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <button onClick={getRecipes} type="button"><i
                        className="fi fi-br-search text-xl"></i></button>
                    </span>
                                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {recipes
                                            .filter(r => !activity.recipes.some(recipe => recipe.id === r.id))
                                            .map((r) => (
                                                <li key={r.id} className="py-3 sm:py-4">
                                                    <div className="flex items-center">
                                                        <div className="flex-1 min-w-0 ms-4">
                                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                {r.name}
                                                            </p>
                                                        </div>
                                                        <div
                                                            className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                            <button
                                                                onClick={() => addRecipe(r)}
                                                                type="button">
                                                                <i className="fi fi-sr-plus"></i>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                    </ul>
                                </dd>
                            </div>

                            <div className="flex w-full items-center justify-center">
                                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table
                                        className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <thead
                                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                {t('createActivity.recipe')}
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                {t('createActivity.number')}
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                {t('createActivity.max')}
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                {t('createActivity.action')}
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {activity.recipes
                                            .map((r) => (
                                                <tr key={r.id}
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                        {r.name}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <div className="flex items-center">
                                                            <button
                                                                onClick={() => (updateCountRecipes(r.count - 1, r.id))}
                                                                className=" inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                                type="button">
                                                                <span className="sr-only">Quantity button</span>
                                                                <svg className="w-3 h-3" aria-hidden="true"
                                                                     xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                     viewBox="0 0 18 2">
                                                                    <path stroke="currentColor" strokeLinecap="round"
                                                                          strokeLinejoin="round" strokeWidth="2"
                                                                          d="M1 1h16"/>
                                                                </svg>
                                                            </button>
                                                            <div>
                                                                <input type="number" id="first_product"
                                                                       max={999}
                                                                       min={0}
                                                                       value={r.count}
                                                                       onChange={(e) => (updateCountRecipes(parseInt(e.target.value), r.id))}
                                                                       className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                       placeholder="1" required/>
                                                            </div>
                                                            <button
                                                                onClick={() => (updateCountRecipes(r.count + 1, r.id))}
                                                                className=" inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                                type="button">
                                                                <span className="sr-only">Quantity button</span>
                                                                <svg className="w-3 h-3" aria-hidden="true"
                                                                     xmlns="http://www.w3.org/2000/svg" fill="none"
                                                                     viewBox="0 0 18 18">
                                                                    <path stroke="currentColor" strokeLinecap="round"
                                                                          strokeLinejoin="round" strokeWidth="2"
                                                                          d="M9 1v16M1 9h16"/>
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                                        {r.max}
                                                    </td>
                                                    <td className="px-6 py-4">
                                                        <button
                                                            onClick={() => remove(r.id, 'recipes')}
                                                            className=" font-medium text-red-600 dark:text-red-500 hover:underline">{t('createActivity.remove')}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </>
                    ) : step === 5 ? (
                        <>
                            <div className="flex justify-between mt-8 p-4 flex-col">
                                <div className="flex mb-4">
                                    <h5 className="font-semibold text-gray-900 dark:text-white mr-8">Titre :</h5>
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">{activity.title}</p>
                                </div>
                                <h5 className="font-semibold text-gray-900 dark:text-white mr-8">Description</h5>
                                <div
                                    style={{maxHeight: "150px"}}
                                    className="overflow-y-auto scroll-container mb-4">
                                    <p className="mb-2 text-gray-500 dark:text-gray-400">{activity.description}
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
                                {
                                    activity.files.length > 0 ? (
                                        <>
                                            <h5 className="font-semibold text-gray-900 dark:text-white mr-8">Files</h5>
                                            <div
                                                style={{maxHeight: '250px', overflowY: 'auto'}}
                                                className="mt-4 scroll-container">
                                                {activity.files.map((f) => (
                                                    <div key={f.name}
                                                         className="divide-y divide-gray-100 rounded-md border mb-4 border-gray-200">
                                                        <div
                                                            className="flex items-center justify-between p-4 text-sm leading-6">
                                                            <div className="flex w-0 flex-1 items-center">
                                                                <PaperClipIcon
                                                                    className="h-5 w-5 flex-shrink-0 text-gray-400 "
                                                                    aria-hidden="true"/>
                                                                <div className="ml-4 flex min-w-0 flex-1 gap-2 pl-2">
                                                <span
                                                    className="truncate font-medium">{f.name.length > 30 ? `${f.name.slice(0, 30)}...` : f.name}</span>
                                                                    <span
                                                                        className="flex-shrink-0 text-gray-400">{(f.size / (1024 * 1024)).toFixed(2)} MB</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : null
                                }

                                <div>
                                    <label className="inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value={activity.public}
                                            onChange={(e) => (updateField('public', e.target.checked))}
                                            className="sr-only peer"/>
                                        <div
                                            className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Publier l'activité</span>
                                    </label>
                                </div>
                            </div>
                        </>
                    ) : null
                ) : (
                    <div className="flex flex-wrap max-w-full items-center justify-between mx-auto">
                        <Spinner color="pink" aria-label="Extra large spinner example" size="xl"/>
                    </div>
                )}
            </Modal.Body>
            <Modal.Footer>
                <div className="flex justify-between w-full">
                    <button
                        onClick={() => previousStep()}
                        className=" text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        {t("generic.previous")}
                    </button>
                    {step === 5 ? (
                        <button
                            onClick={() => save()}
                            className=" text-white bg-green focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex">
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