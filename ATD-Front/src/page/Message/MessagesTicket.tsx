import {useTranslation} from "react-i18next";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
import moment from 'moment';
import {useEffect, useState} from "react";
import {useToast} from "../../components/Toast/ToastContex";
import {Spinner} from 'flowbite-react';
import {getTicket} from "../../apiService/TicketService";
import * as React from "react";
import {ITicket} from "../../interfaces/ticket"
import {useAuth} from "../../AuthProvider"
import {useParams} from "react-router-dom";
import {sendMessage} from "../../apiService/MessageService"
import "./message.css"

'use client';

function MessageTicket() {

    const {ticketId} = useParams()

    const [standBy, setStandBy] = useState(true);
    const [ticket, setTicket] = useState<ITicket>();
    const [message, setMessage] = useState<string>("");
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

    const handleSubmit = async () => {
        if (message.trim() !== "") {
            const req = await sendMessage(ticketId, {description: message}, pushToast);
            setTicket((prevTicket) => ({
                ...prevTicket,
                messages: [...prevTicket.messages, req.data.message]
            }));
            setMessage("")
        }
    }

    return (
        <main className="with-msg">
            <div className="flex flex-wrap max-w-full min-w-full items-center justify-between mx-auto">

            {!standBy ? (
                <>
                    <section className="h-full"
                             style={{width: "30vw", maxWidth: "416px"}}>
                        <div
                            style={{width: "100%", maxWidth: "416px"}}
                            className="h-full  bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <div className="p-5">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ticket.title}</h5>
                                <p className="mb-3 text-xl text-gray-700 dark:text-gray-400">{ticket.title}</p>
                                <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">Emis
                                    le {moment(ticket.created_at).format('DD/MM/YYYY')}</p>

                            </div>
                        </div>
                    </section>
                    <section className="h-full" style={{width: "60vw",maxWidth: "835px"}}>
                        <div
                            style={{width: "100%", maxWidth: "835px",maxHeight: 'calc(100vh - 212px)'}}
                            className="h-full w-full flex flex-col">
                            <div className="h-full w-full px-4 mx-auto"
                            >
                                <div className="h-full overflow-y-auto max-h-full scroll-container"
                                     style={{maxWidth: "835px"}}
                                >
                                    {ticket.messages.map((m, index) => (
                                        <div key={index}
                                             className={`flex ${auth.user.id === m.user.id ? "justify-end" : "justify-start"} dark:bg-gray-700 gap-2.5 p-4`}>
                                            <div
                                                className={`flex flex-col w-full max-w-[320px] leading-1.5 p-4 border-gray-200 ${auth.user.id === m.user.id ? "bg-blue-200 rounded-l-lg rounded-b-lg" : "bg-gray-100 rounded-r-lg rounded-b-lg"} dark:bg-gray-700`}>
                                                <div
                                                    className="flex items-center space-x-2 rtl:space-x-reverse justify-between">
                                                    <span
                                                        className="text-sm font-semibold text-gray-900 dark:text-white">{m.user.forname} {m.user.name}</span>
                                                    <span
                                                        className="text-sm font-normal text-gray-500 dark:text-gray-400">{moment(m.created_at).format('HH:mm')}</span>
                                                </div>
                                                <p className="text-sm font-normal py-2.5 text-gray-900 dark:text-white"
                                                   style={{wordWrap: "break-word"}}>{m.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <label htmlFor="chat" className="sr-only">Your message</label>
                            <div className="flex items-center px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-700">
                                    <textarea id="chat" rows="1"
                                              style={{maxHeight: '42px', minHeight: '42px'}}
                                              className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                              placeholder={"Message..."}
                                              value={message}
                                              onKeyDown={(e) => e.key === 'Enter' ? handleSubmit() : null}
                                              onChange={(e) => setMessage(e.target.value)}
                                    ></textarea>
                                <button
                                    onClick={handleSubmit}
                                    type="button"
                                    className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600">
                                    <svg className="w-5 h-5 rotate-90 rtl:-rotate-90" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                        <path
                                            d="m17.914 18.594-8-18a1 1 0 0 0-1.828 0l-8 18a1 1 0 0 0 1.157 1.376L8 18.281V9a1 1 0 0 1 2 0v9.281l6.758 1.689a1 1 0 0 0 1.156-1.376Z"/>
                                    </svg>
                                    <span className="sr-only">Send message</span>
                                </button>
                            </div>
                        </div>
                    </section>
                </>
                ) : (
                <Spinner color="pink" aria-label="Extra large spinner example" size="xl"/>
                )}
                </div>
        </main>

    )
}

export default MessageTicket;