import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useToast} from "../../components/Toast/ToastContex";
import {IUser} from "../../interfaces/user";
import "./profile.css"
import TimelineCompnent from "../../components/Timeline/Timeline";
import {getUser, PatchShedule, patchUser} from "../../apiService/UserService";
import {Spinner} from "flowbite-react";
import {useParams} from "react-router-dom";
import {getActivities, getActivitiesUser, getBeforeActivitiesUser} from "../../apiService/ActivityService";
import {IActivity} from "../../interfaces/activity";
import UserInfo from "../../components/profile/userInfo";
import Roles from "../../components/profile/Roles";
import Files from "../../components/profile/Files";
import EditUser from "../../components/profile/EditUser";
import isEqual from 'lodash/isEqual';
import PartnerSchedule from "../../components/profile/PartnerSchedule";
import {useAuth} from "../../AuthProvider.jsx";
import ActivivityModal from "../../components/modal/activityModal";

export default function Profile() {

    const {t} = useTranslation();
    const {userId} = useParams();
    const [standBy, setStandBy] = useState(true);
    const [edit, setedit] = useState(false);
    const {pushToast} = useToast();
    const [user, setUser] = useState<IUser | null>(null);
    const [activities, setActivities] = useState<IActivity[] | null>([]);
    const [activitiesUser, setActivitiesUser] = useState<IActivity[] | null>([]);
    const [beforeActivitiesUser, setBeforeActivitiesUser] = useState<IActivity[] | null>([]);
    const [modal, setModal] = useState<boolean>(false);
    const [activityId, setActivityId] = useState<number>();


    const auth = useAuth();

    useEffect(() => {
        request()
    }, []);


    async function request() {
        setStandBy(true);
        try {
            const userResponse = await getUser(userId, pushToast);
            console.log(userResponse)
            if(userResponse?.response?.status === 401)
                auth.logOut();
            setUser(userResponse);

            const activityResponse = await getActivities({page: 0, pageSize: 3}, pushToast);
            setActivities(activityResponse)

            const activityResponseFuture = await getActivitiesUser(userId, pushToast);
            setActivitiesUser(activityResponseFuture)

            const activityResponseBefore = await getBeforeActivitiesUser(userId, pushToast);
            setBeforeActivitiesUser(activityResponseBefore)
            setStandBy(false);
        } catch (error) {
            setStandBy(true);
        }
    }

    const selectActivity = (id) => {
        setActivityId(id)
        setModal(true)
    }

    const handleSaveUser = async (newUser) => {
        if (!isEqual(user, newUser)) {
            try {
                const res = await patchUser(newUser, pushToast, userId)
                if (res.message === "User updated successfully") {
                    setUser(res.user)
                }
            } catch (error) {
                console.log(error)
            }
        }
        setedit(false)
    }

    const saveSchedule = async (schedule) => {
        try {
            const res = await PatchShedule({schedule:schedule}, pushToast, userId)
            console.log(res)
            if (res.message === "User updated successfully") {
                setUser(res.user)
            }
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <main className={"bg-gray-50"}>
            {standBy ? (
                <div className="m-auto flex flex-wrap max-w-full items-center justify-between">
                    <Spinner color="pink" aria-label="Extra large spinner example" size="xl"/>
                </div>
            ) : (
                <section
                        className="dark:bg-gray-900">
                    {modal ? (
                        <ActivivityModal
                            setOpenModal={(v) => (setModal(v))}
                            activityId={activityId}
                        />
                    ) : null}
                        <div
                     className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3">
                        <div
                            style={{width: "25vw"}}
                            className="px-4 mx-auto">
                            {edit ? (
                                <EditUser
                                    user={user}
                                    onButtonClick={() => {
                                        setedit(false)
                                    }}
                                    onSave={handleSaveUser}
                                />
                            ) : (
                                <UserInfo
                                    user={user}
                                    onButtonClick={() => {
                                        setedit(true)
                                    }}
                                />
                            )}
                            <Roles user={user}/>
                            <Files user={user}/>

                        </div>
                            <div className="px-4 mx-auto ">
                                <div
                                    style={{width: "70vw"}}
                                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8 ">
                                    <h1 className="text-gray-900 dark:text-white text-3xl md:text-3xl font-extrabold mb-5">{t("user.comingActivities")}</h1>
                                    <TimelineCompnent
                                        activities={activities}
                                        onItemClick={(id) => selectActivity(id)}
                                    />
                                </div>
                                <div
                                    style={{width: "70vw"}}
                                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8 ">
                                    <h1 className="text-gray-900 dark:text-white text-3xl md:text-3xl font-extrabold mb-5">{t("user.yourActivities")}</h1>
                                    <TimelineCompnent
                                        activities={activitiesUser}
                                        onItemClick={(id) => selectActivity(id)}
                                    />
                                </div>
                                <div
                                    style={{width: "70vw"}}
                                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8 ">
                                    <h1 className="text-gray-900 dark:text-white text-3xl md:text-3xl font-extrabold mb-5">{t("user.beforeActivity")}</h1>

                                    <TimelineCompnent
                                        activities={beforeActivitiesUser}
                                        onItemClick={(id) => selectActivity(id)}
                                    />
                                </div>
                            </div>
                        </div>
                    {user.roles.filter(role => role.id === 4).length > 0 ? (
                        <div
                            className="m-4 bg-white text-center dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8">
                            <h2 className="dark:text-white text-3xl md:text-3xl font-extrabold mb-1">{t("generic.timetable")}</h2>
                            <p className="text-justify text-gray-500 dark:text-gray-400 mb-4">{t("user.scheduleInfos")}</p>
                            <PartnerSchedule
                                onSave={saveSchedule}
                                prevSchedule={user.schedules}/>
                        </div>
                    ) : null}
                </section>
            )}
        </main>
    )
}