import "./activityForm.css"

function ActivityForm(){
    const demandActivity = "Demander une activité/service"
    const activityType = "Type d'activité/service"
    const selectActivity = "Sélectionnez un type d'activité/service"
    const message = "Faire une autre demande"
    const placeHolderMsg = "Formulez votre demande..."
    const submitBtn = "Envoyer le message"
    const listActivity = ["1", "2", "3"];
    return (
        <section className="activity-form bg-white dark:bg-gray-900">
            <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-lg">
                <h2 className="mb-12 text-4xl tracking-tight text-center text-gray-900 dark:text-white">{demandActivity}</h2>
                <form action="#" className="space-y-8">
                    <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 ">
                        <div className="mr-4">
                            <label htmlFor="activityType"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{activityType}</label>
                            <select id="activityType"
                                    className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                    required>
                                <option value="" disabled selected hidden>{selectActivity}</option>
                                {listActivity.map((activity, index) => (
                                    <option key={index} value={activity}>{activity}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message"
                               className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{message}</label>
                        <textarea id="message" rows="6"
                                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                  placeholder={placeHolderMsg}></textarea>
                    </div>
                    <button type="submit"
                            className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{submitBtn}
                    </button>
                </form>
            </div>
        </section>
    )
}

export default ActivityForm