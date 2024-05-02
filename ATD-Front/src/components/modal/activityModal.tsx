'use client';

import {Button, CustomFlowbiteTheme, Modal, Spinner} from 'flowbite-react';
import {IActivity} from "../../interfaces/activity";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../AuthProvider.jsx";
import Cookies from "js-cookie";
import {IRole} from "../../interfaces/user";
import {
    deleteActivityParticipate, getActivity, getActivityForUser,
    isUserRegisteredToActivity,
    postActivitySubscribe
} from "../../apiService/ActivityService";
import {useToast} from "../Toast/ToastContex";
import {useEffect, useState} from "react";
import ListFilesActivity from "../Activity/ListFilesActivity";
import {downloadFile} from "../../apiService/UserService";

export default function ActivivityModal({setOpenModal, activityId}: {
    setOpenModal: (value: boolean) => void,
    activityId: number
}) {

    const {t} = useTranslation();
    const auth = useAuth();
    const {pushToast} = useToast();
    const [activity, setActivity] = useState(null)
    const [standBy, setStandBy] = useState(true)
    const [count, setCount] = useState(1)
    const storedUser = Cookies.get("user");

    const user = storedUser ? JSON.parse(storedUser) : undefined;

    const customTheme: CustomFlowbiteTheme['modal'] = {
        "root": {
            "base": "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
            "show": {
                "on": "flex bg-opacity-50 dark:bg-opacity-80",
                "off": "hidden"
            },
        }
    };


    function haveRoles(roleId): boolean {
        return auth.user.roles.find(r => r.id === roleId)
    }

    useEffect(() => {
        request()
    }, []);


    const request = async () => {
        setStandBy(true)
        await getActivityF()
        setStandBy(false)
    }

    const getActivityF = async () => {
        try {
            const response = await getActivityForUser(activityId, pushToast,{user: auth.user.id})
            setActivity(response.activity)
            console.log(response.activity)
        } catch (e) {
            console.log(e)
        }
    }

    const subscribe = async (r: IRole) => {
        const roleFind = activity.roles.find(role => role.id === r.id)
        if(roleFind.limits.max - roleFind.count < count) {
            pushToast({
                content: "Vous ne pouvez pas ajouter autant de participants",
                type: "failure"
            });
            return
        }

        const SendSubscribe = {
            "user": user,
            "count": count,
            "role": r
        }
        try {
            const res = await postActivitySubscribe(SendSubscribe, pushToast, activity.id)
            setStandBy(true)
            setActivity(res.data.activity)
            setStandBy(false)
        } catch (error) {
            console.log(error)
        }
    }

    const unsubscribe = async () => {
        try {
            const res = await deleteActivityParticipate(activity.id, {user: user.id}, pushToast)
            setStandBy(true)
            setActivity(res.activity)
            setStandBy(false)
        } catch (error) {
            console.log(error)
        }
    }

    const updateCountRoles = (value) => {
        if (value < 1)
            return
        setCount(value)
    }


    return (
        <Modal theme={customTheme} show={true} onClose={() => setOpenModal(false)}>
            {standBy ? (
                <div
                    className="flex flex-wrap max-w-full items-center justify-between mx-auto">
                    <Spinner color="pink" aria-label="Extra large spinner example"
                             size="xl"/>
                </div>
            ) : (
                <>
                    <Modal.Header>{activity.title}</Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                {activity.description}
                            </p>
                            <ListFilesActivity files={activity.files} metaData={false} nbChar={50}/>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        {auth.token ? (
                            <div className="flex flex-col">
                                {activity.roles.map((r) => (
                                    <span key={r.id} className="flex w-full justify-between align-middle">
                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 p-2 mr-4">
                                            {r.name} : {r.count}/{r.limits.max}
                                        </p>
                                        {haveRoles(r.id) ? (
                                            activity.roleSubscribe === r.id && activity.isSubscribe ? (
                                                <button
                                                    onClick={() => unsubscribe()}
                                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                    {t("generic.unregister")}
                                                </button>
                                            ) : ( (r.count < r.limits.max || r.limits.max == 999) ? (
                                                <>
                                                    <input type="number" id="first_product"
                                                           min={0}
                                                           value={count}
                                                           onChange={(e) => (updateCountRoles(parseInt(e.target.value)))}
                                                           className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                           placeholder="1" required/>
                                                    <button
                                                        onClick={() => subscribe(r)}
                                                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                        {t("generic.register")}
                                                    </button>
                                                </>
                                            ): null )
                                        ) : null}
                                    </span>
                                ))}
                            </div>
                        ) : null}
                    </Modal.Footer>
                </>
            )}
        </Modal>
    )
        ;
}