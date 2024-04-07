import {useEffect, useState} from "react";
import {getMaxRecipe, getRecipesFilter} from "../../apiService/RecipeService";
import {IActivityRecipe, IRecipe} from "../../interfaces/recipe";
import {useToast} from "../Toast/ToastContex";
import {t} from "i18next";
import {IActivityProduct, IProduct} from "../../interfaces/product";
import {getMaxProduct, getProductsFilter} from "../../apiService/productService";

export default function ListProductsActivity({onActivityProductsChange,prevProducts}: {
        onActivityProductsChange: (products: IActivityProduct[]) => void,
        prevProducts:IActivityProduct[]
    }) {

    const [filter, setFilter] = useState<string>('');
    const [products, setProducts] = useState<IProduct[]>([])
    const [activityProducts, setactivityProducts] = useState<IActivityProduct[]>(prevProducts)

    const {pushToast} = useToast();

    async function getProducts() {
        try {
            const productsRespons = await getProductsFilter({filter: filter}, pushToast);
            setProducts(productsRespons)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        onActivityProductsChange(activityProducts);
    }, [activityProducts]);

    const addProduct = async (p: IProduct) => {
        try {
            const max = await getMaxProduct(p.id, pushToast);
            console.log(max)
            const product:IActivityProduct = {
                id:p.id,
                name:p.name,
                measure:p.measure,
                count:1,
                max:max
            }

            setactivityProducts((prev) => (
                [...prev, product]
            ));
        } catch (error) {
            console.error("Une erreur s'est produite lors de l'ajout du produit:", error);
            pushToast("Une erreur s'est produite lors de l'ajout du produit.");
        }
    };

    const remove = (idToRemove: number) => {
        setactivityProducts(prev => (
            prev.filter(p => p.id !== idToRemove)
        ));
    }

    const updateCountProducts = (value: number, id: number) => {
        if(value < 1 ) return
        setactivityProducts(prev => (
            prev.map(p => {
                if (p.id === id) {
                    return {...p, count: value};
                }
                return p
            })
        ));
    }

    return (
        <>
            <div className="flex h-full items-start"
                 style={{height:'320px'}}>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 shadow p-2 rounded h-full">
                    <div className={"h-full scroll-container"} style={{overflow: "auto"}}>
                    <span
                        className="flex mb-6"
                        style={{
                            borderBottom: '1px solid black',
                        }}
                    >
                    <input
                        type="text"
                        name="name"
                        required={true}
                        style={{
                            borderBottom: '0px solid black',
                            borderLeft: 'none',
                            borderRight: 'none',
                            borderTop: 'none',
                            margin: '0',
                            padding: '0',
                            fontSize: '0.875rem',
                            width: '100%'
                        }}
                        value={filter}
                        onKeyDown={(e) => e.key === 'Enter' ? getProducts() : null}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <button onClick={getProducts} type="button"><i
                        className="fi fi-br-search text-xl"></i></button>
                    </span>
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700  h-full"
                            >
                            {products
                                .filter(r => !activityProducts.some(p => p.id === r.id))
                                .map((p) => (
                                    <li key={p.id} className="py-3 sm:py-4">
                                        <div className="flex items-center">
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {p.name}
                                                </p>
                                            </div>
                                            <div
                                                className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                <button
                                                    onClick={() => addProduct(p)}
                                                    type="button">
                                                    <i className="fi fi-sr-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </dd>

                <dd className="flex h-full w-full items-center justify-center"
                     style={{overflow: "auto"}}>
                    <div className="relative h-full w-full p-8 overflow-x-auto shadow-md">
                        <table
                            className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    {t('createActivity.recipe')}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    {t('createActivity.number')}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    {t('createActivity.max')}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    {t('createActivity.action')}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {activityProducts.map((p) => (
                                <tr key={p.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {p.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => (updateCountProducts(p.count - 1, p.id))}
                                                className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                type="button">
                                                <span className="sr-only">Quantity button</span>
                                                <svg className="w-3 h-3" aria-hidden="true"
                                                     xmlns="http://www.w3.org/2000/svg" fill="none"
                                                     viewBox="0 0 18 2">
                                                    <path stroke="currentColor" strokeLinecap="round"
                                                          strokeLinejoin="round" strokeWidth="2"
                                                          d="M1 1h16"/>
                                                </svg>
                                            </button>
                                            <div>
                                                <input type="number" id="first_product"
                                                       max={999}
                                                       min={0}
                                                       value={p.count}
                                                       onChange={(e) => (updateCountProducts(parseInt(e.target.value), p.id))}
                                                       className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                       placeholder="1" required/>
                                            </div>
                                            <button
                                                onClick={() => (updateCountProducts(p.count + 1, p.id))}
                                                className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                type="button">
                                                <span className="sr-only">Quantity button</span>
                                                <svg className="w-3 h-3" aria-hidden="true"
                                                     xmlns="http://www.w3.org/2000/svg" fill="none"
                                                     viewBox="0 0 18 18">
                                                    <path stroke="currentColor" strokeLinecap="round"
                                                          strokeLinejoin="round" strokeWidth="2"
                                                          d="M9 1v16M1 9h16"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {p.max}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => remove(p.id)}
                                            className="font-medium text-red-600 dark:text-red-500 hover:underline">{t('createActivity.remove')}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </dd>
            </div>
        </>
    )
}

