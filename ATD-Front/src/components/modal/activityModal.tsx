'use client';

import {Button, CustomFlowbiteTheme, Modal} from 'flowbite-react';
import {IActivity} from "../../interfaces/activity";
import {useTranslation} from "react-i18next";
import {useAuth} from "../../AuthProvider.jsx";
import Cookies from "js-cookie";
import {IRole} from "../../interfaces/user";
import {
    deleteActivityParticipate,
    isUserRegisteredToActivity,
    postActivitySubscribe
} from "../../apiService/ActivityService";
import {useToast} from "../Toast/ToastContex";
import {useEffect, useState} from "react";

export default function ActivivityModal({setOpenModal, activity}: {
    setOpenModal: (value: boolean) => void,
    activity: IActivity
}) {

    const {t} = useTranslation();
    const auth = useAuth();
    const {pushToast} = useToast();
    const [isParticipate, setIsParticipate] = useState(false)
    const user = JSON.parse(Cookies.get("user"))

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
        participate()
    }, []);

    const participate = async () => {
        try {
            const res = await isUserRegisteredToActivity({user: user}, activity.id, pushToast)
            setIsParticipate(res.message)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const subscribe = async (r: IRole) => {
        const SendSubscribe = {
            "user": user,
            "count": 1,
            "role": r
        }
        try {
            const res = await postActivitySubscribe(SendSubscribe, pushToast, activity.id)
        } catch (error) {
            console.log(error)
        }
    }

    const unsubscribe = async () => {
        try {
            const res = await deleteActivityParticipate(activity.id, {user:user.id}, pushToast)
            setIsParticipate(false)
        } catch (error) {
            console.log(error)
        }
    }


    return (
        <Modal theme={customTheme} show={true} onClose={() => setOpenModal(false)}>
            <Modal.Header>{activity.title}</Modal.Header>
            <Modal.Body>
                <div className="space-y-6">
                    <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                        {activity.description}
                    </p>
                </div>
            </Modal.Body>
            {auth.token ? (
                <Modal.Footer>
                    <div className="flex flex-col">
                        {isParticipate ? (
                            <button
                                onClick={unsubscribe}
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                {t("generic.unsubscribe")}
                            </button>
                        ) : (
                            activity.roles.map((r) =>
                                    <>
                            <span className="flex w-full justify-between align-middle">
                                <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 p-2 mr-4"
                                   key={r.id}>{r.name} : {r.pivot.count}/{r.pivot.max}
                                </p>
                                {(r.pivot.count < r.pivot.max) || (r.pivot.max == 999) ? (
                                    haveRoles(r.id) ? (
                                        <button
                                            onClick={() => subscribe(r)}
                                            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                            {t("generic.register")}
                                        </button>
                                    ) : null
                                ) : null}
                            </span>
                                    </>
                            ))}
                    </div>
                </Modal.Footer>
            ) : null}
        </Modal>
    );
}