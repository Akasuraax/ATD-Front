import {useParams} from 'react-router-dom';
import {useState} from 'react';
import {useToast} from '../../../components/Toast/ToastContex';
import {Spinner} from 'flowbite-react';
import {useTranslation} from "react-i18next";
import {IAddLanguage} from "../../../interfaces/language";
import {postLanguage} from "../../../apiService/LanguageService";
import {useNavigate} from 'react-router-dom';


export default function AddLanguage() {
    const {warehouseId} = useParams();
    const {pushToast} = useToast();
    const [language, setLanguage] = useState<IAddLanguage>({
        abbreviation: '',
        file: undefined,
    });
    const navigate = useNavigate();


    const {t} = useTranslation();

    const updateUserField = (field: string, value: any) => {
        setLanguage((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    async function save(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            const response = await postLanguage(language, pushToast);
            navigate(`/back/languages`)
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
                        <h3 className="text-base font-semibold leading-7 text-gray-900">{t('languages.addBtn')}</h3>
                    </div>
                    <form onSubmit={save} encType="multipart/form-data" action="">
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('languages.abbreviation')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end">
                                            <input
                                                type="text"
                                                name="abbreviation"
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
                                                value={language.abbreviation}
                                                onChange={(e) => updateUserField('abbreviation', e.target.value)}
                                            />
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('languages.file')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end">
                                            <input
                                                type="file"
                                                name="language_file"
                                                required={true}
                                                onChange={(e) => updateUserField('file', e.target.files[0])}
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

