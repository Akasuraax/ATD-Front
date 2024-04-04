import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useToast} from "../../../components/Toast/ToastContex";
import {deleteActivityFile, getActivity} from "../../../apiService/ActivityService";
import {IActivity, IAddActivity} from "../../../interfaces/activity";
import {Spinner} from "flowbite-react";
import './event.css'
import ListRolesActivity from "../../../components/Activity/ListRolesActivity";
import ListRecipesActivity from "../../../components/Activity/ListRecipesActivity";
import ListProductsActivity from "../../../components/Activity/ListProductsActivity";
import {t} from "i18next";
import ListFilesActivity from "../../../components/Activity/ListFilesActivity";
import AddFilesModal from "../../../components/modal/AddFilesModal"
import DeleteModal from "../../../components/modal/deleteModal";
import {deleteUser} from "../../../apiService/UserService";


export default function EventDetails() {

    const {eventId} = useParams();
    const {pushToast} = useToast();
    const [activity, setActivity] = useState<IAddActivity>(null)
    const [standBy, setStandBy] = useState<boolean>(true)
    const [addFileModal, setAddFileModal] = useState<boolean>(false)
    const [removeFileModal, setRemoveFileModal] = useState<boolean>(false)
    const [fileToRemove, setFileToRemove] = useState<File>(null)





    useEffect(() => {
        getEventF()
    }, []);

    const getEventF = async () => {
        setStandBy(true)

        try {
            const response = await getActivity(eventId, pushToast)
            setActivity(response.activity)
            setStandBy(false)
            console.log(response.activity)
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
        setActivity((prev) => ({
            ...prev,
            products: products
        }))
    }

    const changeRecipes = (recipes) => {
        setActivity((prev) => ({
            ...prev,
            recipes: recipes
        }))
    }

    const changeFiles = (files) => {
        setActivity(prev => ({
            ...prev,
            files:files
        }))
    }

    const removeFile = (file) => {

        setFileToRemove(file)
        setRemoveFileModal(true)
    }

    const handleModalClose = async ( valid: boolean) => {
        setRemoveFileModal(false)
        if(!valid) return
        try {
           const res = await deleteActivityFile(activity.id,fileToRemove.id,pushToast)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    };

    const saveChange = () => {


    }


    return (
        <div>
            {!standBy ? (
                <>
                    <AddFilesModal
                    setOpenModal={setAddFileModal}
                    openModal={addFileModal}
                    activityId={activity.id}
                    />
                    <DeleteModal
                        onClose={(valid: boolean) => handleModalClose(valid)}
                        openModal={removeFileModal}
                        text={t("generic.deleteMessage")}
                        />
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
                                className="bg-white flex flex-col justify-between rounded-lg p-4 shadow border-gray-300 dark:border-gray-600 h-96"
                            >
                                <ListFilesActivity
                                    files={activity.files}
                                    onRemoveFile={removeFile}
                                    metaData={false}
                                    nbChar={30}
                                />
                                <div className={"flex justify-end w-full"}>
                                    <button
                                        onClick={() => setAddFileModal(true)}
                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                        {t("file.addFile")}
                                    </button>
                                </div>
                            </div>
                            <div
                                className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72">
                                <button
                                    onClick={saveChange}
                                    className="text-white bg-green focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex">
                                    {t("generic.saveButton")}
                                </button>
                            </div>
                            <div
                                className="border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600 h-48 md:h-72">
                            </div>
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