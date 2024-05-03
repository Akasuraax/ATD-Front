import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useToast} from "../../../components/Toast/ToastContex";
import {IPiece} from "../../../interfaces/piece";
import {IProduct} from "../../../interfaces/product";
import {IWarehouse} from "../../../interfaces/warehouse";
import {useTranslation} from "react-i18next";
import {deletePiece, getPiece, patchPiece} from "../../../apiService/PieceService";
import moment from "moment/moment";
import {Spinner} from "flowbite-react";
import DeleteModal from "../../../components/modal/deleteModal";
import isEqual from 'lodash/isEqual';
import {getProducts} from "../../../apiService/productService";
import {getWarehouses} from "../../../apiService/WarehouseService";
import {generateQr} from "../../../apiService/PieceService";
export default function PieceDetails(){
    const {pieceId} = useParams();
    const [standBy, setStandBy] = useState(true);
    const {pushToast} = useToast();
    const [piece, setPiece] = useState<IPiece | null>(null);
    const [edit, setEdit] = useState(false);
    const [isModified, setIsModified] = useState(false);
    const [newPiece, setNewPiece] = useState<IPiece | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [dataGrid, setDataGrid] = useState({});
    const [selectedDate, setSelectedDate] = useState({});
    const [selectedTime, setSelectedTime] = useState({});
    const {t} = useTranslation();
    const [product, setProduct] = useState<IProduct[] | null>(null);
    const [warehouse, setWarehouse] = useState<IWarehouse[] | null>(null);
    const [qrImageUrl, setQrImageUrl] = useState(null);

    useEffect(() => {
        sendRequest();
    }, [dataGrid]);

    useEffect(() => {
        setIsModified(!isEqual(piece, newPiece));
    }, [newPiece]);

    const updateUserField = (field: string, value: any) => {
        if (field === "product") {
            const selectedProduct : IProduct | undefined = product.find((a) => a.id == value);
            if (selectedProduct) {
                setNewPiece((prev) => ({
                    ...prev,
                    [field]:  selectedProduct,
                }));
            }
        } else if (field === "warehouse") {
            const selectedWarehouse : IWarehouse | undefined = warehouse.find((a) => a.id == value);
            if (selectedWarehouse) {
                setNewPiece((prev) => ({
                    ...prev,
                    [field]: selectedWarehouse,
                }));
            }
        } else {
            setNewPiece((prev) => ({
                ...prev,
                [field]: value,
            }));
        }
    };

    async function save() {
        try {
            const patchRespons = await patchPiece(newPiece, pushToast, pieceId);
            if(patchRespons.piece.status == 2) {
                await handleModalClose(true);
                setEdit(false);
                return;
            }
            setPiece(patchRespons.piece);
            setNewPiece(patchRespons.piece);
            setEdit(false)
        }catch (error) {
            console.log(error)
        }
    }
    async function sendRequest() {
        setStandBy(true);
        try {
            const response = await getPiece(pieceId, pushToast);
            const productsResponse = await getProducts(dataGrid, pushToast);
            const warehousesResponse = await getWarehouses(dataGrid, pushToast);

            setSelectedDate(moment(response[0].expired_date).format('DD/MM/yyyy'))
            setSelectedTime(moment(response[0].expired_date).format('HH:ii'))

            setProduct(productsResponse.data);
            setWarehouse(warehousesResponse.data);
            setPiece(response[0])
            setNewPiece(response[0]);
            setStandBy(false);
        } catch (error) {
            setStandBy(true);
        }
    }

    const handleModalClose = async ( valid: boolean) => {
        setIsModalOpen(false)
        if(!valid) return
        try {
            const res = await deletePiece(pushToast,pieceId)
            setNewPiece(res[0]);
            setPiece(res[0]);
        } catch (error) {
            console.log(error)
        }
        setIsModalOpen(false);
    };

    const showQr = async() => {
        setStandBy(true);
        try {
            const response = await generateQr(pieceId, pushToast);
            setQrImageUrl(response);
            setStandBy(false);
        } catch (error) {
            setStandBy(true);
        }
    }

    const downloadSVG = () => {
        try {
            //je créer un canvas pour pouvoir mettre mon svg puis le télécharger en png
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = 500;
            canvas.height = 500;

            //je met un fond blanc
            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            const img = new Image();
            img.onload = () => {
                //ici c'est pour le centrer
                ctx.drawImage(img, 150, 150);

                const pngURL = canvas.toDataURL("image/png");

                //ici cest pour donner le nom de l'image et télécharger
                const link = document.createElement("a");
                link.href = pngURL;
                link.setAttribute("download", "qr-code.png");
                document.body.appendChild(link);
                link.click();
                
                document.body.removeChild(link);
            };

            img.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(qrImageUrl)}`;
        } catch (error) {
            console.error("Erreur lors du téléchargement du code QR:", error);
        }
    };

    return (
        <main>
            <div className="flex flex-wrap max-w-full items-center justify-between mx-auto">
                {!standBy ? (
                    <>
                        <div className="border p-4 rounded-xl shadow-md">
                            <div className="px-4 sm:px-0">
                                <h3 className="text-base font-semibold leading-7 text-gray-900">{t('pieces.pieceDetails') + ' ' + pieceId}</h3>
                            </div>
                            <div className="mt-6 border-t border-gray-100">
                                <dl className="divide-y divide-gray-100">

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('pieces.product_name')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end">
                                                {edit ? (
                                                    <select
                                                        name="product"
                                                        required={true}
                                                        style={{
                                                            border: '1px solid black',
                                                            borderRadius: '4px',
                                                            padding: '0.25rem 3rem',
                                                            fontSize: '0.875rem'
                                                        }}
                                                        value={newPiece?.product.id}
                                                        onChange={(e) => {
                                                            updateUserField('product', e.target.value);
                                                        }}>
                                                        {
                                                            product.map(function (data) {
                                                                return (
                                                                    <option key={data.id}
                                                                            value={data.id}>{data.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                ) : (
                                                    <span>{newPiece?.product.name}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('pieces.count')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
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
                                                        value={newPiece?.count}
                                                        onChange={(e) => updateUserField('count', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{newPiece.count}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('pieces.measure')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                <span>{newPiece?.product?.measure}</span>
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('pieces.warehouse_name')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                {edit ? (
                                                    <select
                                                        name="warehouse"
                                                        required={true}
                                                        style={{
                                                            border: '1px solid black',
                                                            borderRadius: '4px',
                                                            padding: '0.25rem 3rem',
                                                            fontSize: '0.875rem'
                                                        }}
                                                        value={newPiece?.warehouse.id}
                                                        onChange={(e) => {
                                                            updateUserField("warehouse", e.target.value);
                                                        }}>
                                                        {
                                                            warehouse.map(function (data) {
                                                                return (
                                                                    <option key={data.id}
                                                                            value={data.id}>{data.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </select>
                                                ) : (
                                                    <span>{newPiece?.warehouse.name}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('pieces.location')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                {edit ? (
                                                    <input
                                                        type="number"
                                                        style={{
                                                            borderBottom: '1px solid black',
                                                            borderLeft: 'none',
                                                            borderRight: 'none',
                                                            borderTop: 'none',
                                                            margin: '0',
                                                            padding: '0',
                                                            fontSize: '0.875rem'
                                                        }}
                                                        value={newPiece?.location}
                                                        onChange={(e) => updateUserField('location', e.target.value)}
                                                    />
                                                ) : (
                                                    <span>{newPiece.location}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('pieces.expired')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                {edit ? (
                                                    <>
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
                                                            value={selectedDate} // Format utilisé pour l'édition
                                                            onChange={(e) => {
                                                                setSelectedDate(e.target.value);
                                                                updateUserField('expired_date', e.target.value + ' ' + selectedTime);
                                                            }}
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
                                                            value={selectedTime}
                                                            onChange={(e) => {
                                                                setSelectedTime(e.target.value);
                                                                updateUserField('expired_date', selectedDate + ' ' + e.target.value);
                                                            }}
                                                        />
                                                    </>
                                                ) : (
                                                    <span>{moment(newPiece.expired_date).format('DD/MM/yyyy HH:mm')}</span>
                                                )}
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900">{t('user.creationDate')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                <span>{moment(piece.created_at).format('DD/MM/yyyy HH:mm')}</span>
                                            </div>
                                        </dd>
                                    </div>

                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('pieces.isArchived')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end ">
                                                <span>{piece.archive ? t("generic.yes") : t("generic.no")}</span>
                                            </div>
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <div className="m-4 border p-8 rounded-xl shadow-md">
                            <button
                                disabled={piece.archive}
                                className={`block w-full text-white ${piece.archive ? 'bg-purple-300 cursor-not-allowed' : 'bg-purple-700 cursor-pointer hover:bg-purple-800'}  focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:bg-purple-600 dark:hover:bg-purple-700 focus:outline-none dark:focus:ring-purple-800`}
                                onClick={() => {
                                   showQr()
                                }}
                            >
                                {t('pieces.qrCode')}
                            </button>

                            <button
                                disabled={piece.archive}
                                onClick={() => {
                                    setEdit(!edit);
                                }}
                                className={`block w-full text-white ${piece.archive ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-700 cursor-pointer hover:bg-blue-800'}  focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}>
                                {t('generic.editButton')}
                            </button>

                            <button
                                disabled={piece.archive}
                                onClick={() => {
                                    setIsModalOpen(true);
                                }}
                                className={`block w-full focus:outline-none text-white ${piece.archive ? 'bg-yellow-100 cursor-not-allowed' : 'bg-yellow-400 cursor-pointer hover:bg-yellow-500'}  focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-6 me-2 dark:focus:ring-yellow-900`}>
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

                        {qrImageUrl && (
                            <div>
                                <div className="m-4 border p-8 rounded-xl shadow-md">
                                    <div id="svg" dangerouslySetInnerHTML={{__html: qrImageUrl}}/>
                                </div>
                                <div className="m-4 border p-8 rounded-xl shadow-md">
                                    <button onClick={downloadSVG}>Télécharger le QRCode </button>
                                </div>
                            </div>

                        )}
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