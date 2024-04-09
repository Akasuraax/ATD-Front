import {useToast} from "../../../components/Toast/ToastContex";
import {useEffect, useState} from "react";
import {IAddPiece} from "../../../interfaces/piece";
import {useNavigate} from "react-router-dom";
import {useTranslation} from "react-i18next";
import {postPiece} from "../../../apiService/PieceService";
import {getProducts} from "../../../apiService/productService";
import {getWarehouses} from "../../../apiService/WarehouseService";

export default function AddPiece(){
    const [standBy, setStandBy] = useState(false);
    const { pushToast } = useToast();
    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [dataGrid, setDataGrid] = useState({});
    const [selectedProductId, setSelectedProductId] = useState('');
    const [selectedWarehouseId, setSelectedWarehouseId] = useState('');
    const [piece, setPiece] = useState<IAddPiece | null>({
            id_product: 0,
            id_warehouse: 0,
            location: 0,
            count: 0,
            expired_date: null,
        }
    );
    const navigate = useNavigate();
    const {t} = useTranslation();

    useEffect(() => {
        sendRequest();
    }, [dataGrid]);

    const updateUserField = (field: string, value: any) => {
        setPiece((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    const save = async (e) => {
        e.preventDefault();
        const form = e.target;
        const expiredDate = form.elements["expired_date"].value;
        const expiredTime = form.elements["expired_time"].value;
        const expiredDateTime = expiredDate + " " + expiredTime;

        const piece: IAddPiece = {
            product: {
                id: form.elements["id_product"].value
            },
            warehouse: {
                id: form.elements["id_warehouse"].value
            },
            location: form.elements["location"].value,
            count: form.elements["count"].value,
            expired_date: expiredDateTime,
        };

        try {
            const response = await postPiece(piece, pushToast);
            if(response.status === 422) {
                pushToast({
                    content: t("generic.fillMessage"),
                    type: "failure"
                });
            }if(response.status === 201)
                navigate(`/back/pieces`);
        } catch (error) {
            console.log(error);
        }
    };


    async function sendRequest() {
        setStandBy(true);
        try {
            const productsResponse = await getProducts(dataGrid, pushToast);
            const warehousesResponse = await getWarehouses(dataGrid, pushToast);
            setProducts(productsResponse.data);
            setWarehouses(warehousesResponse.data);
            setStandBy(false);
        } catch (error) {
            setStandBy(false);
        }
    }

    return (
        <main>
            <div className="flex flex-wrap max-w-full items-center justify-between mx-auto">
                <div
                    style={{ minWidth: "30vw" }}
                    className="border p-4 rounded-xl shadow-md">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">{t('pieces.pieceDetails')}</h3>
                    </div>
                    <form onSubmit={save}>
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('pieces.product_name')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end">
                                            <select
                                                name="id_product"
                                                required={true}
                                                style={{
                                                    border: '1px solid black',
                                                    borderRadius: '4px',
                                                    padding: '0.25rem 3rem',
                                                    fontSize: '0.875rem'
                                                }}
                                                value={selectedProductId}
                                                onChange={(e) => {
                                                    setSelectedProductId(e.target.value);
                                                    updateUserField('id_product', e.target.value);
                                                }}>
                                                {
                                                    products.map(function (data) {
                                                        return (
                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('pieces.warehouse_name')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end ">
                                            <select
                                                name="id_warehouse"
                                                required={true}
                                                style={{
                                                    border: '1px solid black',
                                                    borderRadius: '4px',
                                                    padding: '0.25rem 3rem',
                                                    fontSize: '0.875rem'
                                                }}
                                                value={selectedWarehouseId}
                                                onChange={(e) => {
                                                    setSelectedWarehouseId(e.target.value);
                                                    updateUserField("id_warehouse", e.target.value);
                                                }}>
                                                {
                                                    warehouses.map(function (data) {
                                                        return (
                                                            <option key={data.id} value={data.id}>{data.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('pieces.count')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end ">
                                            <input
                                                type="text"
                                                name="count"
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
                                                value={piece.count}
                                                onChange={(e) => updateUserField('count', e.target.value)}
                                            />
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('pieces.location')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end ">
                                            <input
                                                type="number"
                                                required={false}
                                                name="location"
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    borderLeft: 'none',
                                                    borderRight: 'none',
                                                    borderTop: 'none',
                                                    margin: '0',
                                                    padding: '0',
                                                    fontSize: '0.875rem'
                                                }}
                                                value={piece.location}
                                                onChange={(e) => updateUserField('location', e.target.value)}
                                            />
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('pieces.expired')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                        <div className="flex items-center justify-end">
                                            <input
                                                type="date"
                                                required={false}
                                                name="expired_date"
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    borderLeft: 'none',
                                                    borderRight: 'none',
                                                    borderTop: 'none',
                                                    margin: '0',
                                                    padding: '0',
                                                    fontSize: '0.875rem',
                                                    marginRight: '10px'
                                                }}
                                                value={piece.expired_date}
                                                onChange={(e) => updateUserField('expired_date', e.target.value)}
                                            />
                                            <input
                                                type="time"
                                                required={false}
                                                name="expired_time"
                                                style={{
                                                    borderBottom: '1px solid black',
                                                    borderLeft: 'none',
                                                    borderRight: 'none',
                                                    borderTop: 'none',
                                                    margin: '0',
                                                    padding: '0',
                                                    fontSize: '0.875rem'
                                                }}
                                                value={piece.expired_time}
                                                onChange={(e) => updateUserField('expired_time', e.target.value)}
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