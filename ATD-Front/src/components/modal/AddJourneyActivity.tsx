import {Button, Checkbox, CustomFlowbiteTheme, Label, List, Modal, TextInput} from "flowbite-react";
import {useEffect, useRef, useState} from "react";
import Select from "@mui/material/Select";
import {getAllRoles} from "../../apiService/RoleService";
import {useToast} from "../Toast/ToastContex";
import MenuItem from "@mui/material/MenuItem";
import {t} from "i18next";
import {ICreatActivityRole} from "../../interfaces/role";
import AddressInput from "../input/AddressInput";

export default function AddJourneyActivity({openModal, setOpenModal, saveJourney}: {
    openModal: boolean,
    setOpenModal: (arg0: boolean) => void,
    saveJourney: (arg0: string[]) => void,
}) {
    const {pushToast} = useToast();
    const [addresses, setAddresses] = useState<string[]>(['']);

    const customTheme: CustomFlowbiteTheme['modal'] = {
        "root": {
            "base": "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
            "show": {
                "on": "flex bg-opacity-50 dark:bg-opacity-80",
                "off": "hidden"
            },
        }
    };

    const inputList = () => {
        return (
            addresses.map((address, index) => (
                <List.Item key={index} className="pb-3 sm:pb-4">
                    <div>
                        <div key={index} className={"flex w-full justify-between"}>
                            <div className={"w-80"}>
                                <AddressInput onAddressSelect={(value) => updateAddress(index, value)}/>
                            </div>
                            <button onClick={() => removeAddress(index)}><i className="fi fi-sr-cross"></i></button>
                        </div>
                    </div>
                </List.Item>
            ))
        );
    };

    const removeAddress = (index: number) => {
        const updatedAddresses = addresses.filter((_, i) => i !== index);
        setAddresses(updatedAddresses);
    };
    const updateAddress = (index, value) => {
        addAddress(index, value.label);
    };

    const addAddress = (index: number | null, address: string) => {
        if (index !== null) {
            const updatedAddresses = [...addresses];
            updatedAddresses[index] = address;
            setAddresses(updatedAddresses);
        } else if (addresses.length < 10) {
            setAddresses([...addresses, address]);
        } else {
            pushToast({content: "Vous avez atteint la limite de 10 adresses.", type: "warning"});
        }
        console.log(addresses);
    };

    const save = () => {
        saveJourney(addresses)
        setOpenModal(false)
    }

    return (
        <Modal theme={customTheme} show={openModal} size="md" popup onClose={() => setOpenModal(false)}>
            <Modal.Header>
            </Modal.Header>
            <Modal.Body>
                <List unstyled className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                    {inputList()}
                    <button onClick={() => addAddress(null, '')}><i className="fi fi-rr-add"></i></button>
                </List>
            </Modal.Body>
            <Modal.Footer>
                <div className="pt-4 w-full flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                    <button
                        onClick={() => setOpenModal(false)}
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        {t("generic.cancel")}
                    </button>
                    <button
                        onClick={save}
                        className="text-white bg-green-500 hover:bg-green-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                        {t("generic.register")}
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}
