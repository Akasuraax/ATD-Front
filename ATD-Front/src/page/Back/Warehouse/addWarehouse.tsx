import {useParams} from 'react-router-dom';
import {useState} from 'react';
import {useToast} from '../../../components/Toast/ToastContex';
import {Spinner} from 'flowbite-react';
import {useTranslation} from "react-i18next";
import {IAddWarehouse} from "../../../interfaces/warehouse";
import {getWarehouse, patchWarehouse, postWarehouse} from "../../../apiService/WarehouseService";
import {useNavigate} from 'react-router-dom';


export default function AddWarehouse() {
    const {warehouseId} = useParams();
    const {pushToast} = useToast();
    const [warehouse, setWarehouse] = useState<IAddWarehouse | null>({
            name: '',
            address: '',
            zipcode: 0,
            capacity: 0,
        }
    );
    const navigate = useNavigate();


    const {t} = useTranslation();

    const updateUserField = (field: string, value: any) => {
        setWarehouse((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    async function save(e) {
        e.preventDefault();
        const form = e.target;
            const warehouse:IAddWarehouse = {
                name: form.elements["name"].value,
                address: form.elements["address"].value,
                zipcode: form.elements["zipcode"].value,
                capacity: form.elements["capacity"].value,
            }
        try {
            const respons = await postWarehouse(warehouse, pushToast);
            navigate(`/back/warehouses/${respons.warehouse.id}`)

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
                        <h3 className="text-base font-semibold leading-7 text-gray-900">{t('warehouse.warehouseDetails')}</h3>
                    </div>
                    <form onSubmit={save}>
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('warehouse.name')}</dt>
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
                                                value={warehouse.name}
                                                onChange={(e) => updateUserField('name', e.target.value)}
                                            />
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('warehouse.address')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end ">
                                            <input
                                                type="text"
                                                required={true}
                                                name="address"
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    borderLeft: 'none',
                                                    borderRight: 'none',
                                                    borderTop: 'none',
                                                    margin: '0',
                                                    padding: '0',
                                                    fontSize: '0.875rem'
                                                }}
                                                value={warehouse.address}
                                                onChange={(e) => updateUserField('address', e.target.value)}
                                            />
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('warehouse.zipcode')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end ">
                                            <input
                                                type="text"
                                                name="zipcode"
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
                                                value={warehouse.zipcode}
                                                pattern="[0-9]{5}"
                                                onChange={(e) => updateUserField('zipcode', e.target.value.slice(0, 5).replace(/\D/g, ''))}
                                            />
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('warehouse.capacity')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end ">
                                            <input
                                                type="number"
                                                required={true}
                                                name="capacity"
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    borderLeft: 'none',
                                                    borderRight: 'none',
                                                    borderTop: 'none',
                                                    margin: '0',
                                                    padding: '0',
                                                    fontSize: '0.875rem'
                                                }}
                                                value={warehouse.capacity}
                                                onChange={(e) => updateUserField('capacity', e.target.value)}
                                            />
                                        </div>
                                    </dd>
                                </div>
                            </dl>
                        </div>
                        <button
                            style={{ backgroundColor: "#6AAF5C" }}
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

