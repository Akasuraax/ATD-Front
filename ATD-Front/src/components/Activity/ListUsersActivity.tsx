import {IActivityProduct, IProduct} from "../../interfaces/product";
import {IUser} from "../../interfaces/user";
import {t} from "i18next";
import {Popover} from "flowbite-react";
import {deleteActivityParticipate} from "../../apiService/ActivityService";
import {useToast} from "../Toast/ToastContex";
import {useEffect, useState} from "react";


export default function ListUsersActivity({users, activityId}: {
    users: IUser[],
    activityId: number
}) {

    const {pushToast} = useToast();
    const [usersList, setUsersList] = useState<IUser[]>([])

    const remove = async (id) => {
            try {
                const res = await deleteActivityParticipate(activityId, {user: id}, pushToast)
                if(res.message === "Unsubscribed successfully") {
                    setUsersList(prev => (
                        prev.filter(u => u.id !== id)
                    ));

                    pushToast({
                        content: t("user.removeUser"),
                        type: "success"
                    });
                }
            } catch (error) {
                console.log(error)
            }
    }

    useEffect(() => {
        setUsersList(users);
    }, [users]);

    return (
        <div className="m-4">
            <div className="flex h-full items-start">
                <div
                    className="flex h-full w-full justify-center">
                    <table
                        className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead
                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('user.name')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('user.lastName')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('user.email')}
                            </th>
                            <th scope="col" className="px-6 py-3">
                                {t('createActivity.action')}
                            </th>
                        </tr>
                        </thead>
                        <tbody>
                        {usersList.map((u) => (
                            <tr key={u.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {u.id}
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {u.name}
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {u.forname}
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    {u.email}
                                </td>
                                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                                    <button
                                        onClick={() => remove(u.id)}
                                        className="font-medium text-red-600 dark:text-red-500 hover:underline">{t('createActivity.remove')}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
