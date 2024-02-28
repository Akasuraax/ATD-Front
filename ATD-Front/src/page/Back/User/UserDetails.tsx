import {PaperClipIcon} from '@heroicons/react/20/solid';
import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {deleteUser, getUser} from '../../../apiService/UserService';
import {useToast} from '../../../components/Toast/ToastContex';
import {IUser, IRole} from '../../../interfaces/user';
import {Spinner} from 'flowbite-react';
import {Datepicker} from 'flowbite-react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import Select, {SelectChangeEvent} from '@mui/material/Select';
import moment from 'moment';
import {getRoles} from '../../../apiService/RoleService';
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
    const {t} = useTranslation();


    useEffect(() => {
        rolesRequest();
        sendRequest();
    }, []);

    useEffect(() => {
        setIsModified(!isEqual(user, newUser));
    }, [newUser]);

    const updateUserField = (field: string, value: any) => {
        setNewUser((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    const handleRoleChange = (event: SelectChangeEvent) => {
        const selectedRoles = event.target.value as unknown as (string | number)[];
        const rolesAsNumbers = selectedRoles.map((role) => Number(role));
        updateUserField('roles', rolesAsNumbers);
    };

    const saveUser = () => {
        console.log(user)
    }


    async function sendRequest() {
        setStandBy(true);
        try {
            const userResponse = await getUser(userId, pushToast);
            setUser(userResponse.user);
            setNewUser(userResponse.user);
            setStandBy(false);
        } catch (error) {
            setStandBy(false);
        }
    }

    async function rolesRequest() {
        setStandBy(true);
        try {
            const rolesResponse = await getRoles(null, pushToast);
            setRoles(rolesResponse);
        } catch (error) {
            setStandBy(false);
        }
    }

    const handleModalClose = async ( valid: boolean) => {
        setIsModalOpen(false)
        if(!valid) return
        try {
            const res = await deleteUser({'ban':true},pushToast,userId)
            console.log(res)
        } catch {
            console.log("err")
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
                                <h3 className="text-base font-semibold leading-7 text-gray-900">{t('user.userDetails')}</h3>
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
                                                        value={newUser?.name || user.name}
                                                        onChange={(e) => updateUserField('name', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{user.name}</span>
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
                                                        value={newUser?.forname || user.forname}
                                                        onChange={(e) => updateUserField('forname', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{user.forname}</span>
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
                                                        value={newUser?.email || user.email}
                                                        onChange={(e) => updateUserField('email', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{user.email}</span>
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
                                                        value={newUser?.phone_number || user.phone_number}
                                                        onChange={(e) => updateUserField('phone_number', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{user.phone_number}</span>
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
                                                        ? 'Non préciser'
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
                                                        value={newUser?.address || user.address}
                                                        onChange={(e) => updateUserField('address', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{user.address}</span>
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
                                                        onChange={handleRoleChange}
                                                        value={newUser?.roles}
                                                        input={<OutlinedInput label="Name"/>}
                                                    >
                                                        {roles.map((r) => (
                                                            <MenuItem key={r.id} value={r.id}>
                                                                {r.name}
                                                            </MenuItem>
                                                        ))}
                                                    </Select>
                                                ) : (
                                                    <span>
                                                    {user.roles.map((r) => (
                                                        <span key={r.id}>{r.name}</span>
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
                                                                value={newUser?.compagny || user.compagny}
                                                                onChange={(e) => updateUserField('compagny', e.target.value)}
                                                            />
                                                        ) : (
                                                            <span>{user.compagny}</span>
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
                                                                value={newUser?.siret_number || user.siret_number}
                                                                onInput={(e) => e.target.value = e.target.value.replace(/[^\d]/g, '').slice(0, 14)}
                                                                onChange={(e) => updateUserField('siret_number', e.target.value)}
                                                            />
                                                        ) : (
                                                            <span>{user.siret_number}</span>
                                                        )}
                                                    </div>
                                                </dd>
                                            </div>
                                        </>
                                    ) : ''}
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">{t('user.creationDate')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-between ">
                                                <span>{moment(user.created_at).format('DD/MM/yyyy HH:mm')}</span>
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">{t('user.file')}</dt>
                                        <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                            <ul role="list"
                                                className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                                <li className="flex items-center justify-between p-4 text-sm leading-6">
                                                    <div className="flex w-0 flex-1 items-center">
                                                        <PaperClipIcon class="h-5 w-5 flex-shrink-0 text-gray-400 "
                                                                       aria-hidden="true"/>
                                                        <div className="ml-4 flex min-w-0 flex-1 gap-2 pl-2">
                                                <span
                                                    className="truncate font-medium">resume_back_end_developer.pdf</span>
                                                            <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                                        </div>
                                                    </div>
                                                    <div className="ml-4 pl-2 flex-shrink-0">
                                                        <button>Télécharger</button>
                                                    </div>
                                                </li>
                                            </ul>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="m-4 border p-8 rounded-xl shadow-md">
                            <button
                                onClick={() => {
                                    setEdit(!edit);
                                }}
                                className="block w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                {t('generic.editButton')}
                            </button>

                            <button
                                onClick={() => {
                                    setIsModalOpen(!edit);
                                }}
                                className="block w-full focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:focus:ring-yellow-900">
                                {t('generic.deleteButton')}
                            </button>

                            <button
                                className="block w-full focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
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
                onClose={(valid: boolean) => handleModalClose(valid)}
            />
        </main>
    )
}