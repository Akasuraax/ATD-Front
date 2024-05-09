import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useToast} from "../../../components/Toast/ToastContex";
import {
    deleteActivity,
    deleteActivityFile,
    getActivity, patchActivity, patchActivityProducts,
    patchActivityRecipes,
    patchActivityRoles, postJourney, routePlanner
} from "../../../apiService/ActivityService";
import {IActivity, IAddActivity} from "../../../interfaces/activity";
import {Spinner, Textarea} from "flowbite-react";
import './event.css'
import ListRolesActivity from "../../../components/Activity/ListRolesActivity";
import ListRecipesActivity from "../../../components/Activity/ListRecipesActivity";
import ListProductsActivity from "../../../components/Activity/ListProductsActivity";
import {t} from "i18next";
import ListFilesActivity from "../../../components/Activity/ListFilesActivity";
import AddFilesModal from "../../../components/modal/AddFilesModal"
import DeleteModal from "../../../components/modal/deleteModal";
import {deleteUser} from "../../../apiService/UserService";
import AddressInput from "../../../components/input/AddressInput";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import {getTypesAll} from "../../../apiService/TypeService";
import {IType} from "../../../interfaces/type";
import JourneyActivity from "../../../components/Activity/JourneyActivity";
import AddJourneyActivity from "../../../components/modal/AddJourneyActivity";
import SaveJourneyModal from "../../../components/modal/SaveJourneyModal";


export default function EventDetails() {

    const {eventId} = useParams();
    const {pushToast} = useToast();
    const [activity, setActivity] = useState<IAddActivity>(null)
    const [standBy, setStandBy] = useState<boolean>(true)
    const [addFileModal, setAddFileModal] = useState<boolean>(false)
    const [addJourneyModal, setAddJourneyModal] = useState<boolean>(false)
    const [removeFileModal, setRemoveFileModal] = useState<boolean>(false)
    const [saveJourneyModal, setSaveJourneyModal] = useState<boolean>(false)
    const [bestJourney, setBestJourney] = useState<string[]>([])

    const [fileToRemove, setFileToRemove] = useState<File>(null)
    const navigate = useNavigate();


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

    const updateField = (field: string, value: any) => {
        setActivity((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

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

    const changeFiles = (files: File[]) => {
        setActivity(prev => ({
            ...prev,
            files: [...prev.files, ...files]
        }))
    }

    const removeFile = (file) => {
        setFileToRemove(file)
        setRemoveFileModal(true)
    }

    const handleModalClose = async (valid: boolean) => {
        setRemoveFileModal(false)
        if (!valid) return
        try {
            const res = await deleteActivityFile(activity.id, fileToRemove.id, pushToast)
            setActivity(prev => ({
                ...prev,
                files: prev.files.filter(f => f.name !== fileToRemove.name)
            }))
        } catch (error) {
            console.log(error)
        }
    };

    const saveChange = async () => {
        try {
            const res = await patchActivity(activity, pushToast, activity.id)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const saveChangeRoles = async () => {
        try {
            const res = await patchActivityRoles({role_limits: activity.roles}, pushToast, activity.id)
        } catch (error) {
            console.log(error)
        }
    }

    const saveChangeRecipes = async () => {
        console.log(activity.recipes)
        try {
            const res = await patchActivityRecipes({recipes: activity.recipes}, pushToast, activity.id)
        } catch (error) {
            console.log(error)
        }
    }

    const saveChangeProducts = async () => {
        try {
            const res = await patchActivityProducts({list_products: activity.products}, pushToast, activity.id)
        } catch (error) {
            console.log(error)
        }
    }

    const removeActivity = async () => {
        try {
            const res = await deleteActivity(pushToast, activity.id)
            if (res.status === 204) {
                navigate("/back/events")
            }

        } catch (error) {
            console.log(error)
        }
    }

    const editJourney = async (journey: string[]) => {
        try {
            const res = await routePlanner({steps: journey}, pushToast)
            console.log(res)
            const formattedJourneyString = res.data.steps.replace(/'/g, '"');
            const journeyArray = JSON.parse(formattedJourneyString);
            setBestJourney(journeyArray)
            setSaveJourneyModal(true);

        } catch (error) {
            console.log(error)
        }
    }

    const saveJourney = async (j) => {
        const journeyToSend = {
            journey: {
                name: j.name
            },
            steps: j.steps.map(step => step.address),
            activity: activity,
            vehicle: {
                id: j.vehicleId
            }
        }
        try {
            const res = await postJourney(journeyToSend, pushToast)
            const journey = [res.data.journey]
            updateField('journeys', journey)
            setSaveJourneyModal(false)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <main
        style={{width:"100vw"}}>
            {!standBy ? (
                <div className={"bg-event"}
                style={{width:"100%"}}>
                    <>
                        <div>
                            <AddFilesModal
                                setOpenModal={setAddFileModal}
                                openModal={addFileModal}
                                activityId={activity.id}
                                update={changeFiles}
                            />
                            <DeleteModal
                                onClose={(valid: boolean) => handleModalClose(valid)}
                                openModal={removeFileModal}
                                text={t("generic.deleteMessage")}
                            />
                            <AddJourneyActivity
                                openModal={addJourneyModal}
                                setOpenModal={setAddJourneyModal}
                                saveJourney={editJourney}
                            />
                            <SaveJourneyModal
                                setOpenModal={setSaveJourneyModal}
                                activityId={activity.id}
                                openModal={saveJourneyModal}
                                update={saveJourney}
                                journeySteps={bestJourney}
                            />
                            <div
                                className="bg-white flex justify-end sm:p-5 p-4 shadow rounded-lg border-dashed border-gray-300 dark:border-gray-600 m-4">
                                <button
                                    onClick={removeActivity}
                                    className="text-white bg-red focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 flex">
                                    {t("generic.deleteButton")}
                                </button>
                            </div>
                            <div className="p-4 sm:p-5 h-auto pt-20 bg-event grid grid-cols-2 gap-4">
                                <div className="h-auto bg-event grid grid-cols-2 gap-4">
                                    <div
                                        style={{height: "448px"}}
                                        className="bg-white sm:p-5 p-4 shadow rounded-lg border-dashed border-gray-300 dark:border-gray-600 h-96 mb-4">
                                        <h5 className="font-semibold text-gray-900 dark:text-white mr-8 mb-2">{t("activity.back.details")}</h5>
                                        <>
                                            <div className={'overflow-auto scroll-container'}
                                                 style={{maxHeight: "320px", overflow: 'auto'}}>
                                                <label htmlFor="title"
                                                       className="block mt-4 mb-1 text-sm font-medium text-gray-900 dark:text-white">{t('createActivity.createTitle')}</label>
                                                <input
                                                    type="text"
                                                    name="title"
                                                    required={true}
                                                    style={{
                                                        borderBottom: '1px solid black',
                                                        borderLeft: 'none',
                                                        borderRight: 'none',
                                                        borderTop: 'none',
                                                        margin: '0',
                                                        padding: '0',
                                                        fontSize: '0.875rem',
                                                        width: '20%',
                                                        marginBottom: '12px',
                                                    }}
                                                    value={activity.title}
                                                    onChange={(e) => updateField('title', e.target.value)}
                                                />
                                                <label htmlFor="description"
                                                       className="block mt-4 mb-1 text-sm font-medium text-gray-900 dark:text-white">{t('createActivity.createDescription')}</label>
                                                <Textarea
                                                    style={{
                                                        minHeight: "50px",
                                                        maxHeight: "200px"
                                                    }}
                                                    value={activity.description}
                                                    onChange={(e) => updateField('description', e.target.value)}
                                                    name="description"
                                                    required={true}
                                                    id="description"
                                                    className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    placeholder={t("recipe.details") + "..."}>
                                                </Textarea>
                                                <label htmlFor="title"
                                                       className="block mt-4 text-sm font-medium text-gray-900 dark:text-white">{t('createActivity.createType')}</label>
                                                <p>{activity.type.name}</p>

                                                <label htmlFor="address"
                                                       className="block mt-4 mb-1 text-sm font-medium text-gray-900 dark:text-white">{t('createActivity.address')}</label>
                                                <AddressInput
                                                    onAddressSelect={(address) => updateField('address', address.value.description)}
                                                    prevAddres={activity.address}
                                                />
                                                <label htmlFor="startDate"
                                                       className="block mt-4 mb-1 text-sm font-medium text-gray-900 dark:text-white">{t('createActivity.createStartDate')}</label>
                                                <p>{activity.start_date.toString()}</p>
                                                <label htmlFor="endDate"
                                                       className="block mt-4 mb-1 text-sm font-medium text-gray-900 dark:text-white">{t('createActivity.createEndDate')}</label>
                                                <p>{activity.end_date.toString()}</p>

                                                <label htmlFor="title"
                                                       className="block mt-4 mb-1 text-sm font-medium text-gray-900 dark:text-white">{t('createActivity.createDonation')}</label>
                                                <input type="number" id="first_product"
                                                       min={0}
                                                       value={activity.donation}
                                                       onChange={(e) => (updateField("donation", parseInt(e.target.value)))}
                                                       className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                       required/>
                                            </div>
                                        </>

                                        <div className={"flex justify-end mt-4"}>
                                            <button
                                                onClick={saveChange}
                                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                {t("generic.editButton")}
                                            </button>
                                        </div>
                                    </div>
                                    <div
                                        style={{height: "448px"}}
                                        className="bg-white flex flex-col justify-between rounded-lg p-4 shadow border-gray-300 dark:border-gray-600 h-96">
                                        <h5 className="font-semibold text-gray-900 dark:text-white mr-8 mb-2">{t("activity.files")}</h5>
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
                                </div>
                                <div
                                    style={{height: "448px"}}
                                    className="bg-white flex flex-col justify-between sm:p-5 p-4 shadow rounded-lg border-dashed border-gray-300 dark:border-gray-600 mb-4">
                                    <h5 className="font-semibold text-gray-900 dark:text-white mr-8 mb-2">{t("createActivity.roles")}</h5>
                                    <div className={"flex flex-col justify-between h-full"}>
                                        <ListRolesActivity
                                            onActivityRolesChange={changeRoles}
                                            prevRoles={activity.roles}
                                        />
                                    </div>
                                    <div className={"flex justify-end mt-4"}>
                                        <button
                                            onClick={saveChangeRoles}
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                            {t("generic.editButton")}
                                        </button>
                                    </div>
                                </div>
                                {activity.type.access_to_warehouse ? (
                                    <>
                                        <div
                                            style={{height: "448px"}}
                                            className="bg-white flex flex-col justify-between sm:p-5 p-4 shadow rounded-lg border-dashed border-gray-300 dark:border-gray-600 h-96 mb-4">
                                            <h5 className="font-semibold text-gray-900 dark:text-white mr-8 mb-2">{t("activity.back.recipes")}</h5>
                                            <div>
                                                <ListRecipesActivity
                                                    onActivityRecipesChange={changeRecipes}
                                                    prevRecipe={activity.recipes}
                                                />
                                            </div>
                                            <div className={"flex justify-end mt-4"}>
                                                <button
                                                    onClick={saveChangeRecipes}
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    {t("generic.editButton")}
                                                </button>
                                            </div>
                                        </div>
                                        <div
                                            style={{height: "448px"}}
                                            className="bg-white flex flex-col justify-between sm:p-5 p-4 shadow rounded-lg border-dashed border-gray-300 dark:border-gray-600 h-96 mb-4">
                                            <h5 className="font-semibold text-gray-900 dark:text-white mr-8 mb-2">{t("activity.back.products")}</h5>
                                            <ListProductsActivity
                                                onActivityProductsChange={changeProducts}
                                                prevProducts={activity.products}
                                            />
                                            <div className={"flex justify-end mt-4"}>
                                                <button
                                                    onClick={saveChangeProducts}
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    {t("generic.editButton")}
                                                </button>
                                            </div>
                                        </div>
                                    </>
                                ) : null}
                                {activity.type.access_to_journey ? (
                                    <div className="grid grid-cols-4 gap-4 mb-4">
                                        <div className="col-span-3">
                                            <div
                                                style={{height: "480px"}}
                                                className="bg-white flex flex-col justify-between rounded-lg p-4 shadow border-gray-300 dark:border-gray-600">
                                                <div className={"flex justify-between"}>
                                                    <h5 className="font-semibold text-gray-900 dark:text-white mr-8 mb-2">{t("activity.journey")}</h5>
                                                    <h5 className="font-semibold text-gray-900 dark:text-white mr-8 mb-2">{activity.journeys[0]?.name}</h5>
                                                </div>
                                                {activity.journeys[0] !== undefined ? (
                                                    <JourneyActivity journey={activity.journeys[0].steps}/>
                                                ) : null}
                                                <div className={"flex justify-end mt-4"}>
                                                    <button
                                                        onClick={() => setAddJourneyModal(true)}
                                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                        {t("activity.addJourney")}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : null}
                            </div>
                        </div>
                    </>
                </div>
            ) : (
                <div className={"flex flex-wrap max-w-full items-center justify-between mx-auto"}>
                    <Spinner color="pink" aria-label="Extra large spinner example" size="xl"/>
                </div>
            )}
        </main>
    )
}