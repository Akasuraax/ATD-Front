import {useTranslation} from "react-i18next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import {getMyTickets, getTicket} from "../../apiService/TicketService";
import moment from 'moment';
import {useEffect, useState} from "react";
import {useToast} from "../../components/Toast/ToastContex";
import {Spinner} from 'flowbite-react';
import * as React from "react";
import {ITicket} from "../../interfaces/ticket"
import {useAuth} from "../../AuthProvider"
import {useParams} from "react-router-dom";

'use client';

function MessageTicket() {

    const {ticketId} = useParams()

    const [standBy, setStandBy] = useState(true);
    const [ticket, setTicket] = useState<ITicket>();
    const auth = useAuth()
    const {pushToast} = useToast();


    const {t} = useTranslation();

    useEffect(() => {
        request();
    }, []);

    async function request() {
        setStandBy(true);
        try {
            const TicketResponse = await getTicket(ticketId, pushToast);
            setTicket(TicketResponse.ticket);
            setStandBy(false);
        } catch (error) {
            setStandBy(true);
        }
    }

    return (
        <main className="with-msg">
            <section>
                {!standBy ? (
                    <div className="pt-3 pb-16 px-4 mx-auto">
                        {ticket.messages.map((m) => (
                            <>
                                <div className={`flex ${auth.user.id == m.user.id ? "justify-end" : "justify-start"} dark:bg-gray-700\`} gap-2.5`}>
                                    <div
                                        className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 ${auth.user.id == m.user.id ? "bg-blue-100 rounded-l-lg rounded-b-lg" : "bg-gray-100 rounded-r-lg rounded-b-lg"} dark:bg-gray-700`}>
                                        <div className="flex items-center space-x-2 rtl:space-x-reverse justify-between">
                                    <span
                                        className="text-sm font-semibold text-gray-900 dark:text-white">{m.user.forname} {m.user.name}</span>
                                            <span
                                                className="text-sm font-normal text-gray-500 dark:text-gray-400">{moment(m.created_at).format('HH:mm')}</span>
                                        </div>
                                        <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">{m.description}</p>
                                    </div>
                                </div>

                            </>
                        ))}

                    </div>
                ) : (
                    <Spinner color="pink" aria-label="Extra large spinner example" size="xl"/>
                )}
            </section>
        </main>

    )
}

export default MessageTicket;