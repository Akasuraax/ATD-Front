import './addForm.css'
import {useTranslation} from "react-i18next";

function AddForm(){
    const { t } = useTranslation();
    const title = t("activity.add.title");
    const name = t("activity.add.name");
    const description = t("activity.add.description");
    const needsVehicle = t("activity.add.needsVehicle");
    const needsWarehouse = t("activity.add.needsWarehouse");
    const addBtn = t("activity.add.addBtn");
    const descriptionText = t("activity.add.descriptionText")
    const nameText = t("activity.add.nameText")


    return(
        <main>
            <section className="activity-add-form m-auto bg-white dark:bg-gray-900">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-lg">
                    <h2 className="mb-12 text-4xl tracking-tight text-center dark:text-white">{title}</h2>
                    <form className="space-y-8">
                        <div className="">
                            <div className="">
                                <label htmlFor="name"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{name}</label>
                                <input type="text" id="name"
                                       className="border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                       placeholder={nameText}
                                       required/>
                            </div>
                        </div>
                        <div className="sm:col-span-2">
                            <label htmlFor="message"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{description}</label>
                            <textarea id="message" rows="6"
                                      name="message"
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      placeholder={descriptionText}></textarea>
                        </div>
                        <button type="submit"
                                className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{addBtn}
                        </button>
                    </form>
                </div>
            </section>
        </main>
    )
}

export default AddForm;