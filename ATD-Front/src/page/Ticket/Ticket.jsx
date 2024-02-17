import './ticket.css'
import {useTranslation} from "react-i18next";
import {Ticket} from "../../interfaces/ticket.ts"
import {postTicket} from "../../apiService/apiService.js";
import {useState} from "react";
import {Alert} from "flowbite-react";
'use client';



function TicketPage(){

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showFailureAlert, setShowFailureAlert] = useState(false);


    const { t } = useTranslation();

    const reportProblem = t("ticket.reportProblem");
    const problemType = t("ticket.problemType");
    const selectProblem = t("ticket.selectProblem");
    const problemSubject = t("ticket.problemSubject");
    const placeHolderSubject = t("ticket.placeHolderSubject");
    const message = t("ticket.message");
    const placeHolderMsg = t("ticket.placeHolderMsg");
    const submitBtn = t("ticket.submitBtn");
    const success = t("generic.success");
    const successMessage = t("ticket.successMessage");
    const failure = t("generic.failure");
    const failureMessage = t("ticket.failureMessage");
    const listIssue = ["1", "2", "3"];



    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
       const title = form.elements['subject'].value;
       const message = form.elements['message'].value;
       const type = form.elements['problemType'].value;

       const ticket = new Ticket(title,message,type)

        const req = {ticket, userId:1}

        try {
            const response = await postTicket(req);
            if (response.status === 201) {
                setShowSuccessAlert(true);

                setTimeout(() => {
                    setShowSuccessAlert(false);
                }, 3000);
            }
        } catch (error) {
            setShowFailureAlert(true);
            setTimeout(() => {
                setShowFailureAlert(false);
            }, 3000);
        }

    }

    return (
        <main className="with-msg">
            {showSuccessAlert && (
                <Alert color="success" onDismiss={() => setShowSuccessAlert(false)}>
                    <span className="font-medium">{success}</span> {successMessage}
                </Alert>
            )}
            {showFailureAlert && (
                <Alert color="failure" onDismiss={() => setShowFailureAlert(false)}>
                    <span className="font-medium">{failure}</span> {failureMessage}
                </Alert>
            )}
            <section className="report-form m-auto bg-white dark:bg-gray-900">
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
                                    {listIssue.map((issue, index) => (
                                        <option key={index} value={issue}>{issue}</option>
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
                                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                    placeholder={placeHolderSubject} required/>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{message}</label>
                            <textarea id="message" rows="6"
                                      name="message"
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      placeholder={placeHolderMsg}></textarea>
                        </div>
                        <button type="submit"
                                className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{submitBtn}
                        </button>
                    </form>
                </div>
            </section>
        </main>

    )
}

export default TicketPage;