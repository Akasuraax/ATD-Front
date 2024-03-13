
import './ticket.css'
import {useTranslation} from "react-i18next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import {postTicket} from "../../apiService/TicketService";
import {IType} from "../../interfaces/type";
import {useEffect, useState} from "react";
import {useToast} from "../../components/Toast/ToastContex";
import { Spinner } from 'flowbite-react';
import * as React from "react";
import {getTypes} from "../../apiService/TypeService";
import {useAuth} from "../../AuthProvider"
import { ITicket } from "../../interfaces/ticket"
'use client';

function TicketPage(){

    const [standBy, setStandBy] = useState(true);
    const [types, setTypes] = useState<IType[]>();
    const auth = useAuth()

    const { pushToast } = useToast();


    const { t } = useTranslation();

    const reportProblem = t("ticket.reportProblem");
    const problemType = t("ticket.problemType");
    const selectProblem = t("ticket.selectProblem");
    const problemSubject = t("ticket.problemSubject");
    const placeHolderSubject = t("ticket.placeHolderSubject");
    const message = t("ticket.message");
    const placeHolderMsg = t("ticket.placeHolderMsg");
    const submitBtn = t("ticket.submitBtn");
    const listIssue = ["1", "2", "3"];

    useEffect(() => {
        request();
    }, []);
    async function request() {
        setStandBy(true);
        try {
            const typeResponse = await getTypes(pushToast);
            setTypes(typeResponse.types);
            setStandBy(false);
        } catch (error) {
            setStandBy(true);
        }
    }
    const handleSubmit = async (e) => {
        setStandBy(true);
        e.preventDefault();
        const form = e.target;

        const ticket: ITicket = {
            title:form.elements['subject'].value,
            description:form.elements['message'].value,
            type:Number(form.elements['problemType'].value)
        };

        const req = {ticket, userId:auth.user.id}
        const res = await postTicket(req,pushToast);
        setStandBy(false);
    }

    return (
        <main className="with-msg">
            <section className="report-form m-auto bg-white dark:bg-gray-900">
                {!standBy?(
                <div className="pt-3 pb-16 px-4 mx-auto">
                    <h2 className="mb-12 text-4xl tracking-tight text-center text-gray-900 dark:text-white">{reportProblem}</h2>
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 ">
                            <div className="mr-4">
                                <label htmlFor="problemType"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{problemType}</label>
                                <select
                                    id="problemType"
                                    name="problemType"
                                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                    required>
                                    <option value="" disabled selected hidden>{selectProblem}</option>
                                    {types.map((t) => (
                                        <option value={t.id} key={t.id}>{t.name}</option>
                                    ))}
                                </select>

                            </div>
                            <div className="ml-4">
                                <label htmlFor="subject"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{problemSubject}</label>
                                <input
                                    type="text"
                                    id="subject"
                                    name="subject"
                                    maxLength={255}
                                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                    placeholder={placeHolderSubject} required/>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{message}</label>
                            <textarea id="message" rows={6}
                                      name="message"
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      placeholder={placeHolderMsg}></textarea>
                        </div>
                        <button disabled={standBy} type="submit"
                                className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">
                            {standBy ? (
                            <Spinner className="mr-4" color="warning" aria-label="Alternate spinner button example" size="sm" />) : "" }
                            {submitBtn}
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

export default TicketPage;