import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useToast} from "../../../components/Toast/ToastContex";
import {getActivity} from "../../../apiService/ActivityService";
import {IActivity, IAddActivity} from "../../../interfaces/activity";
import {Spinner} from "flowbite-react";
import './event.css'
import ListRolesActivity from "../../../components/Activity/ListRolesActivity";
import AddRoleModal from "../../../components/modal/addRoleModal";
import ListRecipesActivity from "../../../components/Activity/ListRecipesActivity";
import ListProductsActivity from "../../../components/Activity/ListProductsActivity";


export default function EventDetails() {

    const {eventId} = useParams();
    const {pushToast} = useToast();
    const [activity, setActivity] = useState<IAddActivity>(null)
    const [standBy, setStandBy] = useState<boolean>(true)


    useEffect(() => {
        getEventF()
    }, []);

    const getEventF = async () => {
        setStandBy(true)

        try {
            const response = await getActivity(eventId, pushToast)
            setActivity(response.activity)
            setStandBy(false)
        } catch (e) {
            console.log(e)
        }
    }

    const changeRoles = (roles) => {
        setActivity(prev => ({
            ...prev,
            roles: roles
        }));
    };

    const changeProducts = (products) => {
        console.log(products)
        setActivity((prev) => ({
            ...prev,
            products: products
        }))
    }

    const changeRecipes = (recipes) => {
        console.log(recipes)
        setActivity((prev) => ({
            ...prev,
            recipes: recipes
        }))
    }

    return (
        <div>
            {!standBy ? (
                <>
                    <div className="p-4 md:ml-64 h-auto pt-20 bg-event grid grid-cols-2 gap-4">
                        <div
                            className="bg-white sm:p-5 p-4 shadow rounded-lg border-dashed border-gray-300 dark:border-gray-600 h-96 mb-4">
                            <p>{activity.title}</p>
                            <p>{activity.description}</p>
                            <p>{activity.start_date}</p>
                            <p>{activity.end_date}</p>
                            <p>{activity.type_name}</p>
                            <p>{activity.donation}</p>
                        </div>
                        <div
                            className="bg-white flex flex-col justify-between sm:p-5 p-4 shadow rounded-lg border-dashed border-gray-300 dark:border-gray-600 h-96 mb-4">
                            <ListRolesActivity
                                onActivityRolesChange={changeRoles}
                                prevRoles={activity.roles}
                            />
                        </div>
                        <div
                            className="bg-white flex flex-col justify-between sm:p-5 p-4 shadow rounded-lg border-dashed border-gray-300 dark:border-gray-600 h-96 mb-4">
                            <ListRecipesActivity
                                onActivityRecipesChange={changeRecipes}
                            />
                        </div>
                        <div
                            className="bg-white flex flex-col justify-between sm:p-5 p-4 shadow rounded-lg border-dashed border-gray-300 dark:border-gray-600 h-96 mb-4">
                            <ListProductsActivity
                                onActivityProductsChange={changeProducts}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div
                                className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
                            ></div>
                            <div
                                className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
                            ></div>
                            <div
                                className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
                            ></div>
                            <div
                                className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
                            ></div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div
                                className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
                            ></div>
                            <div
                                className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
                            ></div>
                            <div
                                className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
                            ></div>
                            <div
                                className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72"
                            ></div>
                        </div>
                    </div>
                </>
            ) : (
                <Spinner color="pink" aria-label="Extra large spinner example" size="xl"/>
            )}
        </div>
    )
}