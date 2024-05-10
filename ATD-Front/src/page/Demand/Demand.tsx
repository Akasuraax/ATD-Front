
import './demand.css'
import {useTranslation} from "react-i18next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import {postDemand} from "../../apiService/DemandService";
import {useEffect, useState} from "react";
import {useToast} from "../../components/Toast/ToastContex";
import { Spinner } from 'flowbite-react';
import * as React from "react";
import {getTypesAll} from "../../apiService/TypeService";
import {useAuth} from "../../AuthProvider.jsx"
import { IDemandPost } from "../../interfaces/demand"
import { ITypes } from "../../interfaces/type";

'use client';

function DemandPage(){

    const [standBy, setStandBy] = useState(true);
    const [types, setTypes] = useState<ITypes[]>();
    const auth = useAuth()

    const { pushToast } = useToast();


    const { t } = useTranslation();

    useEffect(() => {
        request();
    }, []);
    async function request() {
        setStandBy(true);
        try {
            const typesResponse = await getTypesAll(pushToast);
            if(typesResponse?.response?.status === 401)
                auth.logOut()
            setTypes(typesResponse.types);
            setStandBy(false);

        } catch (error) {
            setStandBy(true);
        }
    }
    const handleSubmit = async (e) => {
        setStandBy(true);
        e.preventDefault();
        const form = e.target;

        const demand: IDemandPost = {
            description:form.elements['description'].value,
            id_type:Number(form.elements['Type'].value)
        };

        const req = {demand, userId:auth.user.id}
        const res = await postDemand(req,pushToast);
        if(res?.status === 401)
            pushToast({
                content:"Votre compte est toujours en attente",
                type:"failure"
            })
        setStandBy(false);
    }

    return (
        <main className="with-msg">
            <section className="report-form m-auto bg-white dark:bg-gray-900">
                {!standBy?(
                <div className="pt-3 pb-16 px-4 mx-auto">
                    <h2 className="mb-12 text-4xl tracking-tight text-center text-gray-900 dark:text-white">{t('demand.signal')}</h2>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 ">
                            <div className="mr-4">
                                <label htmlFor="Type"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{t('demand.types')}</label>
                                <select
                                    id="Type"
                                    name="Type"
                                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                    required>
                                    <option value="" disabled selected hidden>{t('demand.selectType')}</option>
                                    {types.map((t) => (
                                        <option value={t.id} key={t.id}>{t.name}</option>
                                    ))}
                                </select>

                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="description"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{t('demand.message')}</label>
                            <textarea id="description" rows={6}
                                      name="description"
                                      required={true}
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      placeholder={t('demand.placeholderMessage')}></textarea>
                        </div>
                        <button disabled={standBy} type="submit"
                                className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            {standBy ? (
                            <Spinner className="mr-4" color="warning" aria-label="Alternate spinner button example" size="sm" />) : "" }
                            {t('demand.submitBtn')}
                        </button>
                    </form>
                </div>
                ) : (
                <Spinner color="pink" aria-label="Extra large spinner example" size="xl"/>
                )}
            </section>
        </main>

    )
}

export default DemandPage;