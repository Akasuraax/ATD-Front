import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useToast} from '../../../components/Toast/ToastContex';
import {Spinner} from 'flowbite-react';
import {useTranslation} from "react-i18next";
import {IAddRole} from "../../../interfaces/role";
import {getRole, postRole} from "../../../apiService/RoleService";
import {useNavigate} from 'react-router-dom';
import {IAddProduct, IProduct} from "../../../interfaces/product";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {getProduct, patchProduct, postProduct} from "../../../apiService/productService";

export default function AddProduct() {
    const {productId} = useParams()
    const {pushToast} = useToast();
    const [product, setProduct] = useState<IAddProduct | null>();
    const [standBy, setStandBy] = useState<boolean>(true);

    const navigate = useNavigate();


    const {t} = useTranslation();

    const updateField = (field: string, value: any) => {
        setProduct((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    useEffect(() => {
        getProductF()
    }, []);

    async function getProductF() {
        try {
            setStandBy(true)
            const respons = await getProduct(productId, pushToast);
            console.log(respons)
            setProduct(respons)
            setStandBy(false)
        } catch (error) {
            console.log(error)
        }
    }

    async function save(e) {
        e.preventDefault();
        try {
            const respons = await patchProduct(product, pushToast,productId);
            if (respons.status === 409) {
                pushToast({
                    content: t("recipe.conflictMessage"),
                    type: "failure"
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <main>
            <div className="flex flex-wrap max-w-full items-center justify-between mx-auto">
                {!standBy ? (
                    <div
                        style={{minWidth: "30vw"}}
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
                                                    value={product.name}
                                                    onChange={(e) => updateField('name', e.target.value)}
                                                />
                                            </div>
                                        </dd>
                                    </div>
                                </dl>
                                <dl className="divide-y divide-gray-100">
                                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                        <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">{t('product.measure')}</dt>
                                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                            <div className="flex items-center justify-end">
                                                <Select
                                                    id="gender"
                                                    required
                                                    value={product.measure}
                                                    onChange={(e) => updateField('measure', e.target.value)}
                                                >
                                                    <MenuItem value={"kg"}>Kilo (Kg)</MenuItem>
                                                    <MenuItem value={"l"}>Litre (L)</MenuItem>
                                                    <MenuItem value={"u"}>{t("generic.unit")}</MenuItem>
                                                </Select>
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
                ) : (
                    <Spinner color="pink" aria-label="Extra large spinner example" size="xl"/>
                )}
            </div>
        </main>
    )
}