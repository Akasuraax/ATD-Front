import {useEffect, useState} from "react";
import {getMaxRecipe, getRecipesFilter} from "../../apiService/RecipeService";
import {IActivityRecipe, IRecipe} from "../../interfaces/recipe";
import {useToast} from "../Toast/ToastContex";
import {t} from "i18next";
import {Popover} from "flowbite-react";

export default function ListRecipesActivity({onActivityRecipesChange, prevRecipe}: {
    onActivityRecipesChange: (recipes:IActivityRecipe[]) => void,
    prevRecipe: IActivityRecipe[]
}) {

    const [filter, setFilter] = useState<string>('');
    const [recipes, setRecipes] = useState<IRecipe[]>([])
    const [activityRecipes, setactivityRecipes] = useState<IActivityRecipe[]>(prevRecipe)

    const {pushToast} = useToast();

    async function getRecipes() {
        try {
            const respons = await getRecipesFilter({filter: filter});
            setRecipes(respons)
            console.log(respons)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        onActivityRecipesChange(activityRecipes);
    }, [activityRecipes]);

    const addRecipe = async (r: IRecipe) => {
        try {
            const max = await getMaxRecipe(r.id, pushToast);

            const recipeToAdd: IActivityRecipe = {
                id: r.id,
                name: r.name,
                count: 1,
                products: r.products,
                max: max
            };
            console.log(activityRecipes)
            setactivityRecipes((prev) => (
                [...prev, recipeToAdd]
            ));
        } catch (error) {
            console.error("Une erreur s'est produite lors de l'ajout de la recette:", error);
            pushToast("Une erreur s'est produite lors de l'ajout de la recette.");
        }
    };

    const remove = (idToRemove: number) => {
        setactivityRecipes(prev => (
            prev.filter(recipe => recipe.id !== idToRemove)
        ));
    }

    const updateCountRecipes = (value: number, id: number) => {
        if(value < 1 ) return
        setactivityRecipes(prev => (
            prev.map(recipe => {
                if (recipe.id === id) {
                    return {...recipe, count: value};
                }
                return recipe
            })
        ));
    }

    const contentPopover = (
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
            <div className="px-3 py-2">
                <p>{t("recipe.maxDescription")}</p>
            </div>
        </div>
    );

    return (
        <>
            <div
                style={{height:'320px'}}
                className="flex items-start"
                 >
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
                        onKeyDown={(e) => e.key === 'Enter' ? getRecipes() : null}
                        onChange={(e) => setFilter(e.target.value)}
                    />
                    <button onClick={getRecipes} type="button"><i
                        className="fi fi-br-search text-xl"></i></button>
                    </span>
                        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                            {recipes
                                .filter(r => !activityRecipes.some(recipe => recipe.id === r.id))
                                .map((r) => (
                                    <li key={r.id} className="py-3 sm:py-4">
                                        <div className="flex items-center">
                                            <div className="flex-1 min-w-0 ms-4">
                                                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                                                    {r.name}
                                                </p>
                                            </div>
                                            <div
                                                className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                                                <button
                                                    onClick={() => addRecipe(r)}
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
                                <Popover content={contentPopover}
                                         trigger="hover">
                                    <th scope="col" className="px-6 py-3">
                                        {t('createActivity.maximum')}
                                    </th>
                                </Popover>
                                <th scope="col" className="px-6 py-3">
                                    {t('createActivity.action')}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {activityRecipes.map((r) => (
                                <tr key={r.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                        {r.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <button
                                                onClick={() => (updateCountRecipes(r.count - 1, r.id))}
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
                                                       value={r.count}
                                                       onChange={(e) => (updateCountRecipes(parseInt(e.target.value), r.id))}
                                                       className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                       placeholder="1" required/>
                                            </div>
                                            <button
                                                onClick={() => (updateCountRecipes(r.count + 1, r.id))}
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
                                        {r.max}
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => remove(r.id)}
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

