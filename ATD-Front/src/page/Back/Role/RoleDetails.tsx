import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useToast} from '../../../components/Toast/ToastContex';
import {Spinner} from 'flowbite-react';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import {useTranslation} from "react-i18next";
import DeleteModal from "../../../components/modal/deleteModal";
import {IRoles} from "../../../interfaces/role";
import {deleteRole, getRole, patchRole, getRoles} from "../../../apiService/RoleService";
import {IRole} from "../../../interfaces/user";

export default function RoleDetails(){
    const {roleId} = useParams();
    const [standBy, setStandBy] = useState(true);
    const {pushToast} = useToast();
    const [role, setRole] = useState<IRoles | null>(null);
    const [edit, setEdit] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [newRoles, setNewRoles] = useState<IRoles | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [referencedRole, setReferencedRole] = useState<IRoles | null>(null);
    const [newReferencedRole, setnewReferencedRole] = useState<IRoles | null>(null);
    const [roles, setRoles] = useState<IRole[]>([]);

    const {t} = useTranslation();


    useEffect(() => {
        sendRequest();
    }, []);

    useEffect(() => {
        setIsModified(!isEqual(role, newRoles));
    }, [newRoles]);

    const updateUserField = (field: string, value: any) => {
        setNewRoles((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    async function save() {
        try {
            const patchRespons = await patchRole(newRoles, pushToast, roleId);
            console.log(patchRespons.role)
            setRole(patchRespons.role);
            setNewRoles(patchRespons.role);

            if(patchRespons?.role?.role_id != null) {
                const responseReference = await getRole(patchRespons.role.role_id, pushToast);
                setReferencedRole(responseReference)
                setnewReferencedRole(responseReference);
            }

            setEdit(false)
        }catch (error) {
            console.log(error)
        }
    }

    async function sendRequest() {
        setStandBy(true);
        try {
            const response = await getRole(roleId, pushToast);
            setRole(response)
            setNewRoles(response);

            if(response.role_id !== null) {
                const responseReference = await getRole(response.role_id, pushToast);
                setReferencedRole(responseReference)
                setnewReferencedRole(responseReference);
            }

            const responseAllRoles = await getRoles(null, pushToast);
            setRoles(responseAllRoles.data.slice(0,6))

            setStandBy(false);
        } catch (error) {
            setStandBy(true);
        }
    }

    const handleModalClose = async ( valid: boolean) => {
        setIsModalOpen(false)
        if(!valid) return
        try {
            const res = await deleteRole(roleId, pushToast)
            setNewRoles(res.role);
            setRole(res.role);
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
                                <h3 className="text-base font-semibold leading-7 text-gray-900">{t('roles.roleDetails') + ' ' + roleId}</h3>
                            </div>
                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('roles.name')}</dt>
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
                                                        value={newRoles?.name}
                                                        onChange={(e) => updateUserField('name', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{newRoles.name}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('roles.reference')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end">
                                                {edit ? (
                                                    <select
                                                        name="reference"
                                                        required={true}
                                                        style={{
                                                            border: '1px solid black',
                                                            borderRadius: '4px',
                                                            padding: '0.25rem 3rem',
                                                            fontSize: '0.875rem'
                                                        }}
                                                        value={newRoles?.role_id}
                                                        onChange={(e) => {
                                                            updateUserField("role_id", e.target.value);
                                                        }}>
                                                        <option value=''>{t('roles.none')}</option>
                                                        {
                                                            roles.map(function (data) {
                                                                return (
                                                                    <option key={data.id}
                                                                            value={data.id}>{data.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                ) : (
                                                    <span>{newRoles.role_id === null ? t("generic.no") : newReferencedRole.name  }</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>


                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">{t('user.creationDate')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                <span>{moment(role.created_at).format('DD/MM/yyyy HH:mm')}</span>
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('roles.isArchived')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                <span>{role.archive ? t("generic.yes") : t("generic.no")}</span>
                                            </div>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="m-4 border p-8 rounded-xl shadow-md">
                            <button
                                disabled={role.archive}
                                onClick={() => {
                                    setEdit(!edit);
                                }}
                                className={`block w-full text-white ${role.archive ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-700 cursor-pointer hover:bg-blue-800'}  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>
                                {t('generic.editButton')}
                            </button>

                            <button
                                disabled={role.archive}
                                onClick={() => {
                                    setIsModalOpen(true);
                                }}
                                className={`block w-full focus:outline-none text-white ${role.archive ? 'bg-yellow-100 cursor-not-allowed' : 'bg-yellow-400 cursor-pointer hover:bg-yellow-500'}  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:focus:ring-yellow-900`}>
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