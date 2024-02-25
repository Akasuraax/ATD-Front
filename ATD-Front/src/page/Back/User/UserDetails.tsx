import { PaperClipIcon } from '@heroicons/react/20/solid'
import { useParams } from 'react-router-dom';
import * as React from 'react';
import {getUser} from "../../../apiService/UserService";
import {useEffect, useState} from "react";
import {useToast} from "../../../components/Toast/ToastContex";
import {IUser} from "../../../interfaces/user";
import moment from 'moment';

export default function UserDetails() {

    const { userId } = useParams();
    const [standBy, setStandBy] = useState(true);
    const { pushToast } = useToast();
    const [user, setUser] = useState<IUser>(undefined);

    useEffect(() => {
        sendRequest();
    }, []);

    async function sendRequest() {
        setStandBy(true);
        try {
            const userRespons = await getUser(userId, pushToast);
            console.log(userRespons.user)
            setUser(userRespons.user)
            setStandBy(false);
        } catch (error) {
            setStandBy(false);
        }
    }

    return (
        <main>
            {!standBy ? (
            <div className="flex flex-wrap max-w-full items-center justify-between mx-auto">
                <div className="border p-4 rounded-xl">
                    <div className="px-4 sm:px-0">
                        <h3 className="text-base font-semibold leading-7 text-gray-900">Détails de l'utilisateur</h3>
                    </div>
                    <div className="mt-6 border-t border-gray-100">
                        <dl className="divide-y divide-gray-100">

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">Nom</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                    <div className="flex items-center justify-between ">
                                        <span>{user.name + ' ' + user.forname}</span>
                                        <button
                                            className="px-2 py-1 text-sm font-medium text-blue-500 hover:text-blue-700 focus:outline-none focus:underline">
                                            Éditer
                                        </button>
                                    </div>
                                </dd>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">Email</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                    <div className="flex items-center justify-between ">
                                        <span>{user.email}</span>
                                        <button
                                            className="px-2 py-1 text-sm font-medium text-blue-500 hover:text-blue-700 focus:outline-none focus:underline">
                                            Éditer
                                        </button>
                                    </div>
                                </dd>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">Numéro de
                                    téléphone
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                    <div className="flex items-center justify-between ">
                                        <span>{user.phone_number}</span>
                                        <button
                                            className="px-2 py-1 text-sm font-medium text-blue-500 hover:text-blue-700 focus:outline-none focus:underline">
                                            Éditer
                                        </button>
                                    </div>
                                </dd>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">Genre</dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                    <div className="flex items-center justify-between ">
                                        <span>{user.gender}</span>
                                        <button
                                            className="px-2 py-1 text-sm font-medium text-blue-500 hover:text-blue-700 focus:outline-none focus:underline">
                                            Éditer
                                        </button>
                                    </div>
                                </dd>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">Date
                                    d'anniversaire
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                    <div className="flex items-center justify-between ">
                                        <span>{moment(user.birthdayDate).format('DD/MM/yyyy')}</span>
                                        <button
                                            className="px-2 py-1 text-sm font-medium text-blue-500 hover:text-blue-700 focus:outline-none focus:underline">
                                            Éditer
                                        </button>
                                    </div>
                                </dd>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">Addresse
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                    <div className="flex items-center justify-between ">
                                        <span>{user.address}</span>
                                        <button
                                            className="px-2 py-1 text-sm font-medium text-blue-500 hover:text-blue-700 focus:outline-none focus:underline">
                                            Éditer
                                        </button>
                                    </div>
                                </dd>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">Roles
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                    <div className="flex items-center justify-between ">
                                        {user && user.roles && user.roles.map((role) => (
                                            <span key={role.id}>{role.name}</span>
                                        ))}
                                        <button
                                            className="px-2 py-1 text-sm font-medium text-blue-500 hover:text-blue-700 focus:outline-none focus:underline">
                                            Éditer
                                        </button>
                                    </div>
                                </dd>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900 sm:col-span-1">Date de création
                                </dt>
                                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2">
                                    <div className="flex items-center justify-between ">
                                        <span>{moment(user.created_at).format('DD/MM/yyyy HH:mm')}</span>
                                        <button
                                            className="px-2 py-1 text-sm font-medium text-blue-500 hover:text-blue-700 focus:outline-none focus:underline">
                                            Éditer
                                        </button>
                                    </div>
                                </dd>
                            </div>

                            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
                                <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                    <ul role="list"
                                        className="divide-y divide-gray-100 rounded-md border border-gray-200">
                                        <li className="flex items-center justify-between p-4 text-sm leading-6">
                                            <div className="flex w-0 flex-1 items-center">
                                                <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400 "
                                                               aria-hidden="true"/>
                                                <div className="ml-4 flex min-w-0 flex-1 gap-2 pl-2">
                                                    <span
                                                        className="truncate font-medium">resume_back_end_developer.pdf</span>
                                                    <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                                                </div>
                                            </div>
                                            <div className="ml-4 pl-2 flex-shrink-0">
                                                <button>Télécharger</button>
                                            </div>
                                        </li>
                                    </ul>
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
            ) : (
                <p>Loading...</p>
            )}
        </main>
    )
}