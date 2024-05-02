import {useParams} from 'react-router-dom';
import {useState} from 'react';
import {useToast} from '../../../components/Toast/ToastContex';
import {Spinner} from 'flowbite-react';
import {useTranslation} from "react-i18next";
import {IAddType} from "../../../interfaces/type";
import {postType} from "../../../apiService/TypeService";
import {useNavigate} from 'react-router-dom';

export default function AddType(){
    const {typeId} = useParams();
    const {pushToast} = useToast();
    const [type, setRole] = useState<IAddType | null>({
            name: '',
            description:'',
            color: '',
            display:false,
            type_image:null,
            access_to_warehouse:false,
            access_to_journey:false
        }
    );
    const navigate = useNavigate();


    const {t} = useTranslation();

    const updateUserField = (field: string, value: any) => {
        setRole((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    async function save(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        const type: IAddType = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            color: formData.get("color") as string,
            display: formData.get("display"),
            type_image: formData.get("type_image") as File,
            access_to_warehouse: formData.get("access_to_warehouse"),
            access_to_journey: formData.get("access_to_journey"),
        };
        try {
            const response = await postType(type, pushToast);
            navigate(`/back/types`)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <main>
            <div className="flex flex-wrap max-w-full items-center justify-between mx-auto">
                <div
                    style={{ minWidth: "30vw" }}
                    className="border p-4 rounded-xl shadow-md">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">{t('types.typeDetails')}</h3>
                    </div>
                    <form onSubmit={save} encType="multipart/form-data" action="">
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('types.name')}</dt>
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
                                                value={type.name}
                                                onChange={(e) => updateUserField('name', e.target.value)}
                                            />
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('types.description')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end">
                                            <input
                                                type="text"
                                                name="description"
                                                required={false}
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    borderLeft: 'none',
                                                    borderRight: 'none',
                                                    borderTop: 'none',
                                                    margin: '0',
                                                    padding: '0',
                                                    fontSize: '0.875rem'
                                                }}
                                                value={type.description}
                                                onChange={(e) => updateUserField('description', e.target.value)}
                                            />
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('types.color')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end">
                                            <input
                                                type="text"
                                                name="color"
                                                required={false}
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    borderLeft: 'none',
                                                    borderRight: 'none',
                                                    borderTop: 'none',
                                                    margin: '0',
                                                    padding: '0',
                                                    fontSize: '0.875rem'
                                                }}
                                                value={type.color}
                                                onChange={(e) => updateUserField('color', e.target.value)}
                                            />
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('types.access_to_warehouse')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end">
                                            <select
                                                name="access_to_warehouse"
                                                required={true}
                                                style={{
                                                    border: '1px solid black',
                                                    borderRadius: '4px',
                                                    padding: '0.25rem 3rem',
                                                    fontSize: '0.875rem'
                                                }}
                                                value={type.access_to_warehouse ? "1" : "0"}
                                                onChange={(e) => updateUserField('access_to_warehouse', e.target.value === "1")}
                                            >
                                                <option value="1">Oui</option>
                                                <option value="0">Non</option>
                                            </select>
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('types.access_to_journey')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end">
                                            <select
                                                name="access_to_journey"
                                                required={true}
                                                style={{
                                                    border: '1px solid black',
                                                    borderRadius: '4px',
                                                    padding: '0.25rem 3rem',
                                                    fontSize: '0.875rem'
                                                }}
                                                value={type.access_to_journey ? "1" : "0"}
                                                onChange={(e) => updateUserField('access_to_journey', e.target.value === "1")}
                                            >
                                                <option value="1">Oui</option>
                                                <option value="0">Non</option>
                                            </select>
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('types.display')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end">
                                            <select
                                                name="display"
                                                required={true}
                                                style={{
                                                    border: '1px solid black',
                                                    borderRadius: '4px',
                                                    padding: '0.25rem 3rem',
                                                    fontSize: '0.875rem'
                                                }}
                                                value={type.display ? "1" : "0"}
                                                onChange={(e) => updateUserField('display', e.target.value === "1")}
                                            >
                                                <option value="1">Oui</option>
                                                <option value="0">Non</option>
                                            </select>
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('types.image')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end">
                                            <input
                                                type="file"
                                                name="type_image"
                                                required={false}
                                                onChange={(e) => updateUserField('type_image', e.target.files[0])}
                                            />
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