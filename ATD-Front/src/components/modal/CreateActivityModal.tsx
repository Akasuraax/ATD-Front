'use client';

import {Button, CustomFlowbiteTheme, Modal, Spinner, Textarea} from 'flowbite-react';
import {IActivity, IAddActivity} from "../../interfaces/activity";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../AuthProvider.jsx";
import {useEffect, useState} from "react";
import {IRole} from "../../interfaces/role";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {getType, getTypes, getTypesAll} from "../../apiService/TypeService";
import {getProductsFilter} from "../../apiService/productService";
import {useToast} from "../Toast/ToastContex";
import {IType} from "../../interfaces/type";

export default function CreateActivivityModal({setOpenModal}: {
    setOpenModal: (value: boolean) => void,
}) {

    const {t} = useTranslation();
    const [activity, setActivity] = useState<IAddActivity>({
        title: '',
        description: '',
        address: '',
        zipcode: null,
        start_date: null,
        end_date: null,
        donation: false,
        type: '',
        roles: [],
    })
    const [standBy, setStandBy] = useState<boolean>(true)
    const [types, setTypes] = useState<IType[]>([])
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
    }, []);

    async function getTypeF() {
        setStandBy(true)
        try {
            const respons = await getTypesAll(pushToast);
            const typesList = respons.types
            if (typesList.length !== 0) {
                setTypes(typesList)
                updateField('type', typesList[0].id)
            } else {
                console.log("pas de type")
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

    return (
        <Modal theme={customTheme} show={true} onClose={() => setOpenModal(false)}>
            <Modal.Header>
                <h3>crée activité</h3>
            </Modal.Header>

            <Modal.Body>
                <Stepper/>
                {!standBy ? (
                    <>
                        <div className="flex justify-between mt-8 p-4">
                            <div>
                                <label htmlFor="title"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('activity.createTitle')}</label>
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
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('activity.createTitle')}</label>
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
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('activity.createDescription')}</label>
                            <Textarea
                                style={{
                                    minHeight: "250px",
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
                        </div>
                    </>
                ) : (
                    <Spinner color="pink" aria-label="Extra large spinner example" size="xl"/>
                )}
            </Modal.Body>
            <Modal.Footer>
                <div className="flex justify-between w-full">
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        Previous
                    </button>
                    <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex">
                        Next
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
        ;
}


function Stepper() {
    return (
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
            <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
        <span
            class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                 fill="currentColor" viewBox="0 0 20 20">
                <path
                    d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z"/>
            </svg>
            Personal <span class="hidden sm:inline-flex sm:ms-2">Info</span>
        </span>
            </li>
            <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
        <span
            class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
            <span class="me-2">2</span>
            Account <span class="hidden sm:inline-flex sm:ms-2">Info</span>
        </span>
            </li>
            <li className="flex items-center">
                <span class="me-2">3</span>
                Confirmation
            </li>
        </ol>

    )
}