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
            const response = await getActivityForUser(activityId, pushToast, {user: auth.user.id})
            setActivity(response.activity)
            console.log(response.activity)
        } catch (e) {
            console.log(e)
        }
    }

    const subscribe = async (r: IRole) => {
        const roleFind = activity.roles.find(role => role.id === r.id)
        if (roleFind.limits.max - roleFind.count < count) {
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
                    <Modal.Header>
                        <h2>{activity.title}</h2>
                        <p className={"m-4"}>{activity.type.name}</p>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="space-y-6" style={{height: "200px", overflow: "auto"}}>
                            <p className=" max-w-full text-gray-500 dark:text-gray-400"
                               style={{whiteSpace: 'pre-wrap', wordWrap: 'break-word'}}>
                                {activity.description}
                            </p>
                            <ListFilesActivity files={activity.files} metaData={false} nbChar={50}/>
                        </div>
                        {activity.products.length > 0 ? (
                            <>
                                <h3>{t('activity.products')}</h3>
                                <div className="space-y-6" style={{height: "200px", overflow: "auto"}}>
                                    <div className="relative overflow-x-auto">
                                        <table
                                            className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead
                                                className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 rounded-s-lg">
                                                    Product name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Qty
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {activity.products.map(p =>
                                                <tr key={p.id}
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {p.name}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {p.count}{p.measure}
                                                    </td>
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        ) : null}

                        {activity.recipes.length > 0 ? (
                            <>
                                <h3 className={"mt-8"}>{t('activity.recipes')}</h3>
                                <div className="space-y-6" style={{height: "200px", overflow: "auto"}}>
                                    <div className="relative overflow-x-auto">
                                        <table
                                            className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                            <thead
                                                className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" className="px-6 py-3 rounded-s-lg">
                                                    Product name
                                                </th>
                                                <th scope="col" className="px-6 py-3">
                                                    Qty
                                                </th>
                                                <th scope="col" className="px-6 py-3 rounded-e-lg">
                                                    Produits
                                                </th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            {activity.recipes.map(r =>
                                                <tr key={r.id}
                                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                                    <th scope="row"
                                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                        {r.name}
                                                    </th>
                                                    <td className="px-6 py-4">
                                                        {r.count}
                                                    </td>
                                                    {r.products.map(p =>
                                                        <tr key={p.id} className="bg-white dark:bg-gray-800">
                                                            <th scope="row"
                                                                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                                {p.name}
                                                            </th>
                                                            <td className="px-6 py-4">
                                                                {p.count}{p.measure}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {p.count * r.count}{p.measure}
                                                            </td>
                                                        </tr>
                                                    )}
                                                </tr>
                                            )}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </>
                        ) : null}
                    </Modal.Body>
                    <Modal.Footer>
                        {auth.token && !activity.archive ? (
                                <div className="flex flex-col">
                                    {auth.user.status === 0 ?
                                        (
                                            <p className="ps-5">{t("activity.waitValid")}</p>
                                        )
                                        :

                                        (
                                            <p></p>
                                        )

                                    }
                                    {
                                        activity.roles.map((r) => (
                                            <span key={r.id} className="flex w-full justify-between align-middle">
                                        <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400 p-2 mr-4">
                                            {r.name} : {r.count}/{r.limits.max}
                                        </p>

                                                {haveRoles(r.id) && auth.user.status !== 0 ? (
                                                    activity.roleSubscribe === r.id && activity.isSubscribe ? (
                                                        <button
                                                            onClick={() => unsubscribe()}
                                                            className="btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                            {t("generic.unregister")}
                                                        </button>
                                                    ) : ((r.count < r.limits.max || r.limits.max == 999) ? (
                                                        <>
                                                            <div> {/* Ajout d'un conteneur avec Flexbox */}
                                                                <label>Nombre de participants : </label>
                                                                <input type="number" id="first_product"
                                                                       min={0}
                                                                       value={count}
                                                                       onChange={(e) => (updateCountRoles(parseInt(e.target.value)))}
                                                                       className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                                       placeholder="1" required/>
                                                                <button
                                                                    onClick={() => subscribe(r)}
                                                                    className="btn text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                                                    {t("generic.register")}
                                                                </button>
                                                            </div>
                                                        </>
                                                    ) : null)
                                                ) : null}

                                    </span>
                                        ))
                                    }
                                </div>
                            ) :
                            null
                        }
                    </Modal.Footer>
                </>
            )}
        </Modal>
    )
        ;
}