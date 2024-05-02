import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useToast} from '../../../components/Toast/ToastContex';
import {Spinner} from 'flowbite-react';
import moment from 'moment';
import isEqual from 'lodash/isEqual';
import {useTranslation} from "react-i18next";
import DeleteModal from "../../../components/modal/deleteModal";
import {IProduct} from "../../../interfaces/product";
import {deleteProduct, getProduct, patchProduct} from "../../../apiService/productService";
import {downloadFile} from "../../../apiService/TypeService";
import {PaperClipIcon} from "@heroicons/react/20/solid";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";


export default function TypeDetails(){
    const {productId} = useParams();
    const [standBy, setStandBy] = useState(true);
    const {pushToast} = useToast();
    const [product, setProduct] = useState<IProduct | null>(null);
    const [edit, setEdit] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [newProduct, setNewProduct] = useState<IProduct | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {t} = useTranslation();

    useEffect(() => {
        sendRequest();
    }, []);

    useEffect(() => {
        setIsModified(!isEqual(product, newProduct));
    }, [newProduct]);

    const updateProductField = (field: string, value: any) => {
        setNewProduct((prevUser) => ({
            ...prevUser,
            [field]: value,
        }));
    };

    async function save() {
        try {
            const patchResponse = await patchProduct(newProduct, pushToast, productId);
            setProduct(patchResponse.product);
            setNewProduct(patchResponse.product)
            setEdit(false);
        } catch (error) {
            console.log(error);
        }
    }

    async function sendRequest() {
        setStandBy(true);
        try {
            const response = await getProduct(productId, pushToast);
            setProduct(response)
            setNewProduct(response);
            setStandBy(false);
        } catch (error) {
            setStandBy(true);
        }
    }

    const handleModalClose = async ( valid: boolean) => {
        setIsModalOpen(false)
        if(!valid) return
        try {
            const res = await deleteProduct(productId, pushToast)
            setNewProduct(res.product);
            setProduct(res.product);
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
                                <h3 className="text-base font-semibold leading-7 text-gray-900">{t('product.productDetails') + ' ' + productId}</h3>
                            </div>
                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('product.name')}</dt>
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
                                                        value={newProduct?.name}
                                                        onChange={(e) => updateProductField('name', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{newProduct.name}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('product.measure')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end">
                                                {edit ? (
                                                    <Select
                                                        id="gender"
                                                        required
                                                        value={newProduct.measure}
                                                        onChange={(e) => updateProductField('measure', e.target.value)}
                                                    >
                                                        <MenuItem value={"kg"}>Kilo (Kg)</MenuItem>
                                                        <MenuItem value={"l"}>Litre (L)</MenuItem>
                                                        <MenuItem value={"u"}>{t("generic.unit")}</MenuItem>
                                                    </Select>
                                                ) : (
                                                    <span>{newProduct.measure}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">{t('user.creationDate')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                <span>{moment(product.created_at).format('DD/MM/yyyy HH:mm')}</span>
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('roles.isArchived')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                <span>{product.archive ? t("generic.yes") : t("generic.no")}</span>
                                            </div>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="m-4 border p-8 rounded-xl shadow-md">
                            <button
                                disabled={product.archive}
                                onClick={() => {
                                    setEdit(!edit);
                                }}
                                className={`block w-full text-white ${product.archive ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-700 cursor-pointer hover:bg-blue-800'}  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>
                                {t('generic.editButton')}
                            </button>

                            <button
                                disabled={product.archive}
                                onClick={() => {
                                    setIsModalOpen(true);
                                }}
                                className={`block w-full focus:outline-none text-white ${product.archive ? 'bg-yellow-100 cursor-not-allowed' : 'bg-yellow-400 cursor-pointer hover:bg-yellow-500'}  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:focus:ring-yellow-900`}>
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
                text={t("generic.deleteMessage")}
                onClose={(valid: boolean) => handleModalClose(valid)}
            />
        </main>
    )
}