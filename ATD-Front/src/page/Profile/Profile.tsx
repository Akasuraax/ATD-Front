import {useTranslation} from "react-i18next";
import {useEffect, useState} from "react";
import {useToast} from "../../components/Toast/ToastContex";
import {IUser} from "../../interfaces/user";
import "./profile.css"
import TimelineCompnent from "../../components/Timeline/Timeline";
import {getUser, patchUser} from "../../apiService/UserService";
import {Spinner} from "flowbite-react";
import {useParams} from "react-router-dom";
import {getActivities} from "../../apiService/ActivityService";
import {IActivity} from "../../interfaces/activity";
import UserInfo from "../../components/profile/userInfo";
import Roles from "../../components/profile/Roles";
import Files from "../../components/profile/Files";
import EditUser from "../../components/profile/EditUser";
import isEqual from 'lodash/isEqual';

export default function Profile() {

    const {t} = useTranslation();
    const {userId} = useParams();
    const [standBy, setStandBy] = useState(true);
    const [edit, setedit] = useState(false);
    const {pushToast} = useToast();
    const [user, setUser] = useState<IUser | null>(null);
    const [activities, setActivities] = useState<IActivity[] | null>([]);
    const [newUser, setNewUser] = useState<IUser | null>(null);


    useEffect(() => {
        request()
    }, []);


    async function request() {
        setStandBy(true);
        try {
            const userResponse = await getUser(userId, pushToast);
            setUser(userResponse);
            setNewUser(userResponse);

            //const activityResponse = await getActivities({page: 0, pageSize: 3}, pushToast);
            //setActivities(activityResponse.data)

            setStandBy(false);
        } catch (error) {
            setStandBy(true);
        }
    }

    const handleSaveUser = async (newUser) => {
        if (!isEqual(user, newUser)) {
            try {
                const res = await patchUser(newUser, pushToast, userId)
                if(res.message === "User updated successfully") {
                    setUser(res.user)
                }
            } catch (error) {
                console.log(error)
            }
        }
        setedit(false)
    }


        return (
            <main className={"bg-gray-50"}>
                {standBy ? (
                    <div className="m-auto">
                        <Spinner color="pink" aria-label="Extra large spinner example" size="xl"/>
                    </div>
                ) : (
                    <section className="dark:bg-gray-900">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div
                                style={{width: "25vw"}}
                                className="py-8 px-4 mx-auto lg:py-16 ">
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
                            <div className="py-8 px-4 mx-auto lg:py-16 ">
                                <div
                                    style={{width: "70vw"}}
                                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8 ">
                                    <h1 className="text-gray-900 dark:text-white text-3xl md:text-3xl font-extrabold mb-8">évenement
                                        a venir</h1>
                                    <TimelineCompnent
                                        activities={activities}
                                    />
                                </div>
                                <div
                                    style={{width: "70vw"}}
                                    className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8 ">
                                    <h1 className="text-gray-900 dark:text-white text-3xl md:text-3xl font-extrabold mb-8">évenement
                                        a venir</h1>
                                    <TimelineCompnent
                                        activities={activities}
                                    />
                                </div>
                            </div>
                        </div>
                    </section>
                )}
            </main>
        )
    }