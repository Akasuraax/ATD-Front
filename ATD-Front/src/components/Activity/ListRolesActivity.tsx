import {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import {getAllRoles} from "../../apiService/RoleService";
import {useToast} from "../Toast/ToastContex";
import {ICreatActivityRole, IRoles} from "../../interfaces/role";
import AddRoleModal from "../modal/addRoleModal";

const ListRolesActivity = ({onActivityRolesChange, prevRoles = []}: {
        onActivityRolesChange: (roles: IRoles[]) => void,
        prevRoles?: ICreatActivityRole[]
    }) => {
        const {t} = useTranslation();
        const [activityRoles, setActivityRoles] = useState(prevRoles);
        const [roles, setRoles] = useState([]);
    const [addRoleModal, setAddRoleModal] = useState<boolean>(false)


        const {pushToast} = useToast();

        useEffect(() => {
            getRoleF();
        }, []);


        useEffect(() => {
            onActivityRolesChange(activityRoles);
        }, [activityRoles]);

        async function getRoleF() {
            try {
                const rolesList = await getAllRoles(null, pushToast);
                if (rolesList.length !== 0) {
                    setRoles(
                        rolesList.map(r => ({
                            id: r.id,
                            name: r.name,
                            limits: {
                                min: 1,
                                max: 1
                            }
                        }))
                    );
                } else {
                    pushToast({
                        content: "Pas de roles",
                        type: "failure"
                    });
                }
            } catch (error) {
                console.log(error);
            }
        }

        const removeRole = (roleId) => {
            if(activityRoles.length === 1) {
                pushToast({
                    content: "Vous devez avoir au moins 1 role",
                    type: "failure"
                });
                return
            }
            const updatedRoles = activityRoles.filter(role => role.id !== roleId);
            setActivityRoles(updatedRoles);
        };

        const updateCountRoles = (type: string, value: number, roleId: number) => {
            setActivityRoles(prevRoles => {
                return prevRoles.map(role => {
                    if (role.id === roleId) {
                        return {
                            ...role,
                            limits: {
                                ...role.limits,
                                [type]: value
                            }
                        };
                    }
                    return role;
                });
            });
        };

    const addRole = (r) => {

        setActivityRoles((prev) => (
            [...prev, r]))
        console.log(activityRoles)
    }

        return (
            <>
                <AddRoleModal
                    openModal={addRoleModal}
                    setOpenModal={setAddRoleModal}
                    currentRoles={activityRoles}
                    setRole={addRole}
                />
                <div className="relative scroll-container  overflow-x-auto shadow-md sm:rounded-lg"
                     style={{maxHeight:"250px", overflow:"auto"}}>
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
                        {activityRoles.map((r) => (
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
                                            <svg className="w-3 h-3"
                                                 aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 fill="none"
                                                 viewBox="0 0 18 2">
                                                <path stroke="currentColor"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2" d="M1 1h16"/>
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
                                            <svg className="w-3 h-3"
                                                 aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 fill="none"
                                                 viewBox="0 0 18 18">
                                                <path stroke="currentColor"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M9 1v16M1 9h16"/>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    <div className="flex items-center">
                                        <button
                                            onClick={() => (updateCountRoles("max", r.limits.max - 1, r.id))}
                                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                            type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3"
                                                 aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 fill="none"
                                                 viewBox="0 0 18 2">
                                                <path stroke="currentColor"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2" d="M1 1h16"/>
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
                                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                            type="button">
                                            <span className="sr-only">Quantity button</span>
                                            <svg className="w-3 h-3"
                                                 aria-hidden="true"
                                                 xmlns="http://www.w3.org/2000/svg"
                                                 fill="none"
                                                 viewBox="0 0 18 18">
                                                <path stroke="currentColor"
                                                      strokeLinecap="round"
                                                      strokeLinejoin="round"
                                                      strokeWidth="2"
                                                      d="M9 1v16M1 9h16"/>
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <button
                                        onClick={() => removeRole(r.id)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline">{t('createActivity.remove')}</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <button
                    onClick={() => setAddRoleModal(true)}
                    className="w-full border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-16"
                >
                    <h3>add role</h3>
                </button>
            </>
        );
    }
;

export default ListRolesActivity;
