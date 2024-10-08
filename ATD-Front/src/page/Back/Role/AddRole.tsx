import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useToast} from '../../../components/Toast/ToastContex';
import {Spinner} from 'flowbite-react';
import {useTranslation} from "react-i18next";
import {IAddRole} from "../../../interfaces/role";
import {getRole, getRoles, postRole} from "../../../apiService/RoleService";
import {useNavigate} from 'react-router-dom';
import {IRole} from "../../../interfaces/user";

export default function AddRole(){
    const {roleId} = useParams();
    const {pushToast} = useToast();
    const [role, setRole] = useState<IAddRole | null>({
            name: '',
            role_id: null,
        }
    );
    const navigate = useNavigate();
    const [roles, setRoles] = useState<IRole[]>([]);
    const {t} = useTranslation();

    useEffect(() => {
        sendRequest();
    }, []);


    const updateUserField = (field: string, value: any) => {
        setRole((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    async function sendRequest() {
        try {
            const responseAllRoles = await getRoles(null, pushToast);
            setRoles(responseAllRoles.data.slice(0,6))
        } catch (error) {
            console.log(error)
        }
    }

    async function save(e) {
        e.preventDefault();
        const form = e.target;
        const role:IAddRole = {
            name: form.elements["name"].value,
            role_id: form.elements["role_id"].value
        }
        try {
            const response = await postRole(role, pushToast);
            if(response.status === 201)
                navigate(`/back/roles`)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main>
            <div className="flex flex-wrap max-w-full items-center justify-between mx-auto">
                <div
                    style={{ minWidth: "30vw" }}
                    className="border p-4 rounded-xl shadow-md">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">{t('roles.roleDetails')}</h3>
                    </div>
                    <form onSubmit={save}>
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('roles.name')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end">
                                            <input
                                                type="text"
                                                name="name"
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
                                                value={role.name}
                                                onChange={(e) => updateUserField('name', e.target.value)}
                                            />
                                        </div>
                                    </dd>

                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('roles.reference')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end">
                                            <select
                                                name="role_id"
                                                required={true}
                                                style={{
                                                    border: '1px solid black',
                                                    borderRadius: '4px',
                                                    padding: '0.25rem 3rem',
                                                    fontSize: '0.875rem'
                                                }}
                                                value={role?.role_id}
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
                                        </div>
                                    </dd>
                                </div>
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