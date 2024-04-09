import {PaperClipIcon} from '@heroicons/react/20/solid';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {
    deleteFile,
    deleteUser,
    downloadFile,
    getUser,
    getUserFiles,
    patchUser,
    patchUserAdmin,
    getDonations
} from '../../../apiService/UserService';
import {useToast} from '../../../components/Toast/ToastContex';
import {IUser, IRole} from '../../../interfaces/user';
import {Spinner} from 'flowbite-react';
import {Datepicker} from 'flowbite-react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import moment from 'moment';
import {getAllRoles} from '../../../apiService/RoleService';
import isEqual from 'lodash/isEqual';
import {useTranslation} from "react-i18next";
import DeleteModal from "../../../components/modal/deleteModal";

export default function UserDetails() {
    const {userId} = useParams();
    const [standBy, setStandBy] = useState(true);
    const {pushToast} = useToast();
    const [user, setUser] = useState<IUser | null>(null);
    const [edit, setEdit] = useState(false);
    const [roles, setRoles] = useState<IRole[]>([]);
    const [isModified, setIsModified] = useState(false);
    const [newUser, setNewUser] = useState<IUser | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [ban, setBan] = useState(false);
    const [textModal, setTextModal] = useState();
    const [files, setFiles] = useState([]);
    const [donations, setDonations] = useState([]);
    const {t} = useTranslation();
    const restrictedRoles = [1,2,3,4,5,6]

    useEffect(() => {
        requests()
    }, []);

    async function requests() {
        setStandBy(true)
        await rolesRequest()
        await sendRequest()
        await getUserDonations()
        await sendFiles()
        setStandBy(false)

    }


    useEffect(() => {
        setIsModified(!isEqual(user, newUser));
    }, [newUser]);

    const updateUserField = (field: string, value: any) => {
        setNewUser((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    const handleRoleChange = (event) => {
        const selectedRoleIds = event.target.value;

        if (selectedRoleIds.length === 0) {
            setNewUser({ ...user, roles: [] });
            return;
        }

        const isRestrictedSelection = selectedRoleIds.some(id => restrictedRoles.includes(id));

        const updatedRoles = roles.filter((r) =>
            selectedRoleIds.includes(r.id) ||
            selectedRoleIds.some(id => roles.find(role => role.id === id)?.role_id === r.id)
        );

        const updatedUser = {
            ...user,
            roles: updatedRoles
        };

        setNewUser(updatedUser);
    };

    async function saveUser() {
        try {
            const patchRespons = await patchUserAdmin(newUser, pushToast, userId);
            if(patchRespons.user.status == 2) {
                await handleModalClose(true);
                setEdit(false);
                return;
            }
            setUser(patchRespons.user);
            setNewUser(patchRespons.user);
            setEdit(false);
        }catch (error) {
            console.log(error)
        }
    }
    async function sendRequest() {
        setStandBy(true);
        try {
            const userResponse = await getUser(userId, pushToast);
            setUser(userResponse);
            setNewUser(userResponse);
        } catch (error) {
            setStandBy(true);
        }
    }

    async function getUserDonations(){
        setStandBy(true);
        try{
            const response = await getDonations(userId,pushToast);
            setDonations(response)
        } catch (error) {
            setStandBy(true);
        }
    }

    async function rolesRequest() {
        setStandBy(true);
        try {
            const rolesResponse = await getAllRoles(null, pushToast);
            setRoles(rolesResponse);
        } catch (error) {
            setStandBy(false);
        }
    }

    const handleModalClose = async ( valid: boolean) => {
        setIsModalOpen(false)
        if(!valid) return
        try {
            const res = await deleteUser({"ban":ban},pushToast,userId)
            setNewUser(res.user);
            setUser(res.user);
        } catch (error) {
            console.log(error)
        }
        setIsModalOpen(false);
    };

    async function deleteUserFile(id, idFile){
        try {
            await deleteFile(id, idFile, pushToast);
            setFiles(prevFiles => prevFiles.filter(file => file.id !== idFile));
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    }
    async function sendFiles(){
        try{
            const response = await getUserFiles(userId, pushToast);
            setFiles(response.data);
        }catch (error) {
            console.log(error)
        }
    }

    async function downloadUserFile(id, filename) {
        try {
            const response = await downloadFile(id);
            const fileUrl = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');
            link.href = fileUrl;
            link.setAttribute('download', filename);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(fileUrl);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }

    function isDisabled(role, selectedId) {
        if (role.id === selectedId) return false;
        if (role.role_id === selectedId) return false;
        return true;
    }


    return (
        <main>
            <div className="flex flex-wrap max-w-full items-center justify-between mx-auto">
                {!standBy ? (
                    <>
                        <div className="border p-4 rounded-xl shadow-md">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-base font-semibold leading-7 text-gray-900">{t('user.userDetails') + ' ' + userId}</h3>
                            </div>
                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('user.name')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-between ">
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
                                                        value={newUser?.name}
                                                        onChange={(e) => updateUserField('name', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{newUser.name}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('user.lastName')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-between ">
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
                                                        value={newUser?.forname}
                                                        onChange={(e) => updateUserField('forname', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{newUser.forname}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('user.email')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-between ">
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
                                                        value={newUser?.email}
                                                        onChange={(e) => updateUserField('email', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{newUser.email}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('user.phone')}
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-between ">
                                                {edit ? (
                                                    <input
                                                        type="tel"
                                                        style={{
                                                            borderBottom: '1px solid black',
                                                            borderLeft: 'none',
                                                            borderRight: 'none',
                                                            borderTop: 'none',
                                                            margin: '0',
                                                            padding: '0',
                                                            fontSize: '0.875rem'
                                                        }}
                                                        pattern="^[\d\s]*$"
                                                        onInput={(e) => e.target.value = e.target.value.replace(/[^\d]/g, '').slice(0, 10)}
                                                        value={newUser?.phone_number}
                                                        onChange={(e) => updateUserField('phone_number', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{newUser.phone_number}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('user.gender')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-between ">
                                                {edit ? (
                                                    <Select
                                                        id="gender"
                                                        required
                                                        value={newUser?.gender}
                                                        onChange={(e) => updateUserField('gender', e.target.value)}
                                                    >
                                                        <MenuItem value={0}>Homme</MenuItem>
                                                        <MenuItem value={1}>Femme</MenuItem>
                                                        <MenuItem value={2}>Non préciser</MenuItem>
                                                    </Select>
                                                ) : (
                                                    <span>
                                            {user.gender === 0
                                                ? 'Homme'
                                                : user.gender === 1
                                                    ? 'Femme'
                                                    : user.gender === 2
                                                        ? 'Non précisé'
                                                        : ''}
                                        </span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('user.birthdayDate')}
                                        </dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-between ">
                                                {edit ? (
                                                    <Datepicker
                                                        style={{paddingLeft: '2.5rem'}}
                                                        value={moment(newUser?.birth_date).format('YYYY-MM-DD')}
                                                        onSelectedDateChanged={(date) => updateUserField('birth_date', date)}
                                                    />
                                                ) : (
                                                    <span>{moment(user.birth_date).format('DD/MM/YYYY')}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('user.address')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-between ">
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
                                                        value={newUser?.address}
                                                        onChange={(e) => updateUserField('address', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{newUser.address}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>


                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('user.roles')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-between ">
                                                {edit ? (
                                                    <Select
                                                        labelId="demo-multiple-name-label"
                                                        id="demo-multiple-name"
                                                        multiple
                                                        value={newUser.roles.map((r) => r.id)}
                                                        onChange={handleRoleChange}
                                                        input={<OutlinedInput label="Name"/>}
                                                    >
                                                        {roles.map((r) => (
                                                            <MenuItem
                                                                key={r.id} // Utilisez l'ID du rôle comme clé unique
                                                                value={r.id}
                                                                disabled={isDisabled(r, newUser.roles.length > 0 ? newUser.roles[0].id : null)}
                                                            >
                                                                {r.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                ) : (
                                                    <span>
                                                    {user.roles.map((r) => (
                                                        <span key={r.id}>{r.name + " "}</span>
                                                    ))}
                                                </span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    {user.compagny !== null ? (
                                        <>
                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('user.companyName')}</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                                    <div className="flex items-center justify-between ">
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
                                                                value={newUser?.compagny}
                                                                onChange={(e) => updateUserField('compagny', e.target.value)}
                                                            />
                                                        ) : (
                                                            <span>{newUser.compagny}</span>
                                                        )}
                                                    </div>
                                                </dd>
                                            </div>

                                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                                <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('user.siretNumber')}</dt>
                                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                                    <div className="flex items-center justify-between ">
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
                                                                value={newUser?.siret_number}
                                                                onInput={(e) => e.target.value = e.target.value.replace(/[^\d]/g, '').slice(0, 14)}
                                                                onChange={(e) => updateUserField('siret_number', e.target.value)}
                                                            />
                                                        ) : (
                                                            <span>{newUser.siret_number}</span>
                                                        )}
                                                    </div>
                                                </dd>
                                            </div>
                                        </>
                                    ) : ''}

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('user.waitingValidation')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-between ">
                                                {edit ? (
                                                    <Select
                                                        labelId="demo-multiple-name-label"
                                                        id="demo-multiple-name"
                                                        value={newUser.status}
                                                        onChange={(e) => updateUserField('status', e.target.value)}
                                                        input={<OutlinedInput label="Name"/>}>
                                                        <MenuItem key={0} value={0}>{t("user.onStandby")}</MenuItem>
                                                        <MenuItem key={1} value={1}>{t("user.validated")}</MenuItem>
                                                        <MenuItem key={2} value={2}>{t("user.refused")}</MenuItem>
                                                    </Select>
                                                ) : (
                                                    <span>
                                                    {user.status === 0 && (
                                                        <span
                                                            className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">{t("user.onStandby")}</span>
                                                    )}
                                                        {user.status === 1 && (
                                                            <span
                                                                className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">{t("user.validated")}</span>
                                                        )}
                                                        {user.status === 2 && (
                                                            <span
                                                                className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">{t("user.refused")}</span>
                                                        )}
                                                </span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">{t('user.creationDate')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-between ">
                                                <span>{moment(user.created_at).format('DD/MM/yyyy HH:mm')}</span>
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('user.isArchived')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-between ">
                                                <span>{user.archive ? t("generic.yes") : t("generic.no")}</span>
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('user.isBan')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-between ">
                                                <span>{user.ban ? t("generic.yes") : t("generic.no")}</span>
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">{t('user.file')}</dt>
                                        <div className="d-flex flex-column">
                                            {files.map(function (data) {
                                                return (
                                                    <div key={data.id}>
                                                        <>
                                                            <div
                                                                className="divide-y divide-gray-100 rounded-md border mb-4 border-gray-200">
                                                                <div
                                                                    className="flex items-center justify-between p-4 text-sm leading-6">
                                                                    <div className="flex w-0 flex-1 items-center">
                                                                        <PaperClipIcon
                                                                            className="h-5 w-5 flex-shrink-0 text-gray-400 "
                                                                            aria-hidden="true"/>
                                                                        <div
                                                                            className="ml-4 flex min-w-0 flex-1 gap-2 pl-2">
                                                                            <span
                                                                                className="truncate font-medium">{data["link"].replace(/.*\//, '')}</span>
                                                                        </div>
                                                                    </div>
                                                                    <div className="ml-4 pl-2 flex-shrink-0">
                                                                        <button
                                                                            onClick={() => downloadUserFile(data["id"], data["link"].replace(/.*\//, ''))}>
                                                                            <svg
                                                                                className="w-6 h-6 text-gray-800 dark:text-white"
                                                                                aria-hidden="true"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24" fill="none"
                                                                                viewBox="0 0 24 24">
                                                                                <path stroke="currentColor"
                                                                                      strokeLinecap="round"
                                                                                      strokeLinejoin="round"
                                                                                      strokeWidth="2"
                                                                                      d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"/>
                                                                            </svg>
                                                                        </button>
                                                                        <button
                                                                            onClick={() => deleteUserFile(user.id, data["id"])}>
                                                                            <svg
                                                                                className="w-6 h-6 text-gray-800 dark:text-white"
                                                                                aria-hidden="true"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                width="24" height="24" fill="none"
                                                                                viewBox="0 0 24 24">
                                                                                <path stroke="currentColor"
                                                                                      strokeLinecap="round"
                                                                                      strokeLinejoin="round"
                                                                                      strokeWidth="2"
                                                                                      d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                                                            </svg>
                                                                        </button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                    </div>
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">{t('user.donations')}</dt>
                                        <div className="d-flex flex-column">
                                            {
                                                donations["donations"].map(function (data) {
                                                    return (
                                                        <div key={data.id}>
                                                            <p className="pb-3">{data.amount}€
                                                                le {moment(data.created_at).format("DD/MM/YY")}</p>
                                                        </div>
                                                    )
                                                })
                                            }
                                            <p>Total donné : {donations["total"]}€</p>
                                        </div>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="m-4 border p-8 rounded-xl shadow-md">
                            <button
                                disabled={user.archive}
                                onClick={() => {
                                    setEdit(!edit);
                                }}
                                className={`block w-full text-white ${user.archive ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-700 cursor-pointer hover:bg-blue-800'}  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>
                                {t('generic.editButton')}
                            </button>

                            <button
                                disabled={user.archive}
                                onClick={() => {
                                    setTextModal(t('user.deleteMessage'))
                                    setIsModalOpen(true);
                                    setBan(false)
                                }}
                                className={`block w-full focus:outline-none text-white ${user.archive ? 'bg-yellow-100 cursor-not-allowed' : 'bg-yellow-400 cursor-pointer hover:bg-yellow-500'}  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:focus:ring-yellow-900`}>
                                {t('generic.deleteButton')}
                            </button>

                            <button
                                disabled={user.archive}
                                onClick={() => {
                                    setTextModal(t('user.banMessage'))
                                    setIsModalOpen(true);
                                    setBan(true)
                                }}
                                className={`block w-full focus:outline-none text-white ${user.archive ? 'bg-red-200 cursor-not-allowed' : 'bg-red-700 cursor-pointer hover:bg-red-800'}  focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900`}>
                                {t('generic.banButton')}
                            </button>

                            <button
                                className={`block w-full text-white  ${!isModified ? 'bg-green-200 cursor-not-allowed' : 'bg-green-500 cursor-pointer'}  font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                                disabled={!isModified}
                                onClick={() => {
                                    saveUser();
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

