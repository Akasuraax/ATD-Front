import {useParams} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useToast} from '../../../components/Toast/ToastContex';
import {Spinner} from 'flowbite-react';
import {useTranslation} from "react-i18next";
import {useNavigate} from 'react-router-dom';
import {IAddRecipe} from "../../../interfaces/recipe";
import {getProductsFilter} from "../../../apiService/productService";
import {IProduct} from "../../../interfaces/product";
import {get} from "axios";
import "./recipe.css"
import {postRecipe} from "../../../apiService/RecipeService";
import {Label, Textarea} from 'flowbite-react';


export default function AddRecipe() {

    const {pushToast} = useToast();
    const [recipe, setRecipe] = useState<IAddRecipe | null>({
        name: '',
        description: '',
        products: []
    });
    const [products, setProducts] = useState<IProduct[]>([]);
    const [filter, setFilter] = useState<string>('');
    const [standBy, setStandBy] = useState<boolean>(true);


    const navigate = useNavigate();
    const {t} = useTranslation();

    const updateField = (field: string, value: any) => {
        setRecipe((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    useEffect(() => {
        getProducts()
    }, []);

    async function save(e) {
        e.preventDefault();
        const form = e.target;
        setRecipe((r) => ({
            ...r,
            name: form.elements["name"].value,
        }))
        if (recipe.products.length === 0) {
            pushToast({
                content: "IL faut au moins un ingrédient",
                type: "failure"
            });
            return
        }
        try {
            const respons = await postRecipe(recipe, pushToast);
            if (respons.status === 409) {
                pushToast({
                    content: t("recipe.conflictMessage"),
                    type: "failure"
                });
            } else {
                navigate('/back/recipes')
            }
        } catch (error) {
            console.log(error);
        }
    }

    async function getProducts() {
        try {
            setStandBy(true)
            const productsRespons = await getProductsFilter({filter: filter}, pushToast);
            setProducts(productsRespons)
            setStandBy(false)
        } catch (error) {
            console.log(error)
        }
    }

    function addProduct(p: IProduct) {
        const existingProductIndex = recipe.products.findIndex((product) => product.id === p.id);

        if (existingProductIndex !== -1) {
            setRecipe((r) => {
                const updatedProducts = [...r.products];
                updatedProducts[existingProductIndex].count += 1;
                return {...r, products: updatedProducts};
            });
        } else {
            setRecipe((r) => ({
                ...r,
                products: [...r.products, {...p, count: 1}],
            }));
        }
    }

    function decreaseProduct(p: IProduct) {
        const existingProductIndex = recipe.products.findIndex((product) => product.id === p.id);

        if (existingProductIndex !== -1) {
            setRecipe((r) => {
                const updatedProducts = [...r.products];
                updatedProducts[existingProductIndex].count -= 1;
                if (updatedProducts[existingProductIndex].count <= 0) {
                    updatedProducts.splice(existingProductIndex, 1);
                }
                return {...r, products: updatedProducts};
            });
        }
    }

    function updateProduct(value: number, p: IProduct) {
        const existingProductIndex = recipe.products.findIndex((product) => product.id === p.id);
        if (existingProductIndex !== -1) {
            setRecipe((r) => {
                const updatedProducts = [...r.products];
                updatedProducts[existingProductIndex].count = value;
                if (updatedProducts[existingProductIndex].count <= 0) {
                    updatedProducts.splice(existingProductIndex, 1);
                }
                return {...r, products: updatedProducts};
            });
        }
    }

    function setMeasure(value: string, p: IProduct) {
        const existingProductIndex = recipe.products.findIndex((product) => product.id === p.id);
        if (existingProductIndex !== -1) {
            setRecipe((r) => {
                const updatedProducts = [...r.products];
                updatedProducts[existingProductIndex].measure = value;
                return {...r, products: updatedProducts};
            });
        }
    }


    return (
        <main>
            <div className="flex flex-wrap max-w-full items-center justify-between mx-auto">
                <div
                    style={{width: "20vw", maxWidth: "1024px", minHeight:"628px"}}
                    className="border mr-4 max-w-full p-4 rounded-xl shadow-md">
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                        <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3">
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
                            {!standBy ? (
                                <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {products.map((p) => (
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
                            ) : (
                                <div
                                    style={{minHeight:"489px",justifyContent:"center"}}
                                    className="text-center flex  items-center">
                                    <Spinner color="pink" aria-label="Extra large spinner example" size="xl"/>
                                </div>
                            )}
                        </dd>
                    </div>
                </div>
                <div
                    style={{width: "50vw", maxWidth: "1024px"}}
                    className="border max-w-full p-4 rounded-xl shadow-md">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">{t('recipe.recipeDetails')}</h3>
                    </div>
                    <form onSubmit={save}>
                        <div className="mt-6 border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-2">{t('recipe.titled')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-1">
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
                                                    fontSize: '0.875rem',
                                                    width: '100%'
                                                }}
                                                value={recipe.name}
                                                onChange={(e) => updateField('name', e.target.value)}
                                            />
                                        </div>
                                    </dd>
                                </div>

                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3">
                                        <label htmlFor="description"
                                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('recipe.description')}</label>
                                        <Textarea
                                            style={{
                                                minHeight: "250px",
                                                maxHeight: "500px"
                                            }}
                                            value={recipe.description}
                                            onChange={(e) => setRecipe((r) => ({
                                                ...r,
                                                description: e.target.value
                                            }))}
                                            name="description"
                                            required={true}
                                            id="description"
                                            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder={t("recipe.details") + "..."}>
                                        </Textarea>
                                    </dd>
                                </div>
                                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                    <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-2">{t('recipe.ingrédients')}</dt>
                                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3">
                                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                                            {recipe.products.map((p) => (
                                                <li key={p.id} className="py-3 sm:py-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="min-w-0 ms-4">
                                                            <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                                {p.name}
                                                            </p>
                                                        </div>
                                                        <div
                                                            className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                            <p className="text-sm mr-4 font-medium text-gray-900 truncate dark:text-white">
                                                                <input
                                                                    type="number"
                                                                    style={{
                                                                        width: "60px",
                                                                        border: "0px",
                                                                        background: "transparent",
                                                                        paddingRight: "0px",
                                                                        appearance: "none", /* Chrome, Safari, Edge */
                                                                    }}
                                                                    value={p.count}
                                                                    onChange={(e) => {
                                                                        const value = parseFloat(e.target.value);
                                                                        if (!isNaN(value)) {
                                                                            const roundedValue = parseFloat(value.toFixed(2));
                                                                            updateProduct(roundedValue, p);
                                                                        }
                                                                    }}
                                                                />
                                                                {p.measure !== 'u' ? (
                                                                    (p.measure == 'kg' || p.measure == 'g') ? (
                                                                        <select
                                                                            style={{
                                                                                border: "0px",
                                                                                appearance: "none",
                                                                                WebkitAppearance: "none",
                                                                                MozAppearance: "none",
                                                                                background: "transparent",
                                                                                paddingRight: "5px",
                                                                            }}
                                                                            value={p.measure}
                                                                            onChange={(e) => setMeasure(e.target.value, p)}
                                                                        >
                                                                            <option value="kg">kg</option>
                                                                            <option value="g">g</option>
                                                                        </select>
                                                                    ) : (
                                                                        <select
                                                                            style={{
                                                                                border: "0px",
                                                                                appearance: "none",
                                                                                WebkitAppearance: "none",
                                                                                MozAppearance: "none",
                                                                                background: "transparent",
                                                                                paddingRight: "0px",
                                                                            }}
                                                                            defaultValue="cl"
                                                                            onChange={(e) => setMeasure(e.target.value, p)}
                                                                        >
                                                                            <option value="l">l</option>
                                                                            <option value="cl">cl</option>
                                                                            <option value="ml">ml</option>
                                                                        </select>
                                                                    )
                                                                ) : null}
                                                            </p>
                                                            <div
                                                                className="flex flex-col items-center text-base font-semibold text-gray-900 dark:text-white">
                                                                <button
                                                                    onClick={() => addProduct(p)}
                                                                    type="button">
                                                                    <i className="fi fi-br-angle-small-up"></i>
                                                                </button>
                                                                <button
                                                                    onClick={() => decreaseProduct(p)}
                                                                    type="button">
                                                                    <i className="fi fi-br-angle-small-down"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
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

