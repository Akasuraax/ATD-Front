import {Button, Checkbox, CustomFlowbiteTheme, Label, Modal, TextInput} from "flowbite-react";
import {useEffect, useRef, useState} from "react";
import Select from "@mui/material/Select";
import {getAllRoles} from "../../apiService/RoleService";
import {useToast} from "../Toast/ToastContex";
import MenuItem from "@mui/material/MenuItem";
import {t} from "i18next";
import {ICreatActivityRole} from "../../interfaces/role";

export default function AddRoleModal({openModal, setOpenModal,currentRoles = [], setRole}: {
    openModal: boolean,
    setOpenModal: (arg0: boolean) => void,
    currentRoles: ICreatActivityRole[],
    setRole:(arg0:ICreatActivityRole) => void,
}) {
    const {pushToast} = useToast();
    const emailInputRef = useRef<HTMLInputElement>(null);
    const [roles, setRoles] = useState([])
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
        getRolesF()
    }, []);

    const getRolesF = async () => {
        try {
            const response = await getAllRoles(null, pushToast)
            if (response.length > 0) {
                setRoles(response)
            }

        } catch (e) {
            console.log(e)
        }
    }

    const save = (e) => {
        e.preventDefault();
        const form = e.target;

        const id = parseInt(form.elements["role"].value)
        const min = parseInt(form.elements["min"].value)
        const max = parseInt(form.elements["max"].value)

        if(min > max) {
            console.log(min,max)
            console.log(min > max)
            pushToast({
                content: t("createActivity.RoleNoCompliant"),
                type: "failure"
            });
            return
        }

        const role = roles.find(r => r.id === id)
        const roleToSend:ICreatActivityRole = {
            id:id,
            name:role.name,
            limits: {
                min:min,
                max:max,
            }
        }
        setRole(roleToSend)
        setOpenModal(false)
    }

    return (
        <Modal theme={customTheme} show={openModal} size="md" popup onClose={() => setOpenModal(false)}
               initialFocus={emailInputRef}>
            <Modal.Header/>
            <Modal.Body>
                <form onSubmit={save}>
                    <div className="space-y-6">
                        <h3 className="text-xl font-medium text-gray-900 dark:text-white">{t("roles.addroleactivity")}</h3>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="email" value={t("roles.role")}/>
                            </div>
                            <select
                                id="role"
                                required
                            >
                                {roles.filter(r => !currentRoles.some(role => role.id === r.id))
                                    .map((r) => (
                                    <option value={r.id} key={r.id}>{r.name}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label htmlFor="password" value={t("roles.limit")}/>
                            </div>
                            <div
                                className={"m-4 w-1/2 flex justify-between"}>
                                <div>
                                    <Label value="Min"/>
                                    <input type="number" id="min"
                                           max={999}
                                           min={0}
                                           className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="1" required/>
                                </div>
                                <div>
                                    <Label value="Max"/>
                                    <input type="number" id="max"
                                           max={999}
                                           min={0}
                                           className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                           placeholder="1" required/>
                                </div>
                            </div>
                        </div>
                        <div className="pt-4 flex justify-between text-sm font-medium text-gray-500 dark:text-gray-300">
                            <button
                                onClick={() => setOpenModal(false)}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                {t("generic.cancel")}
                            </button>
                            <button
                                type={"submit"}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                {t("generic.register")}
                            </button>
                        </div>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}
