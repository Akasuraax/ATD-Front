import './addForm.css'
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {postType} from "../../../../apiService/apiService.js";
import {Activity} from "../../../../interfaces/activity.ts";

function AddType(){
    const { t } = useTranslation();
    const title = t("activity.add.title");
    const name = t("activity.add.name");
    const description = t("activity.add.description");
    const needsVehicle = t("activity.add.needsVehicle");
    const needsWarehouse = t("activity.add.needsWarehouse");
    const addBtn = t("activity.add.addBtn");
    const descriptionText = t("activity.add.descriptionText")
    const nameText = t("activity.add.nameText")
    const success = t("activity.add.success");
    const successMessage = t("activity.add.successMessage");
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.elements['name'].value;
        const description = form.elements['description'].value;
        const needsVehicle = form.elements['needsVehicle'].checked;
        const needsWarehouse = form.elements['needsWarehouse'].checked;

        const type = new Activity(name, description, needsWarehouse, needsVehicle)
        try {
            const response = await postType(type);
            if (response.status === 201) {
                setShowSuccessAlert(true);

                setTimeout(() => {
                    setShowSuccessAlert(false);
                }, 3000);
            }
        } catch (error) {
            console.error('Erreur lors de la requête API:', error);
        }

    }

    return(
        <main className="with-msg">
            {showSuccessAlert && (
                    <div
                        className="success flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
                        role="alert">
                        <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true"
                             xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path
                                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            <span className="font-medium">{success}</span> {successMessage}
                        </div>
                    </div>

            )}

            <section className="activity-add-form m-auto bg-white dark:bg-gray-900">
                <div className="pt-3 pb-16 px-4 mx-auto">
                    <h2 className="mb-12 text-4xl tracking-tight text-center dark:text-white">{title}</h2>
                    <form onSubmit={handleSubmit} className="space-y-8">
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
                            <label htmlFor="description"
                                   className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">{description}</label>
                            <textarea id="description" rows="6"
                                      name="message"
                                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                      placeholder={descriptionText}></textarea>
                        </div>
                        <div className="flex justify-center">
                            <div className="flex items-center mr-5 me-4">
                                <input name="needsVehicle" id="inline-checkbox" type="checkbox" className="checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="inline-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{needsVehicle}</label>
                            </div>
                            <div className="flex items-center ml-5 me-4">
                                <input name="needsWarehouse" id="inline-2-checkbox" type="checkbox" className="checkbox w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                                <label htmlFor="inline-2-checkbox"
                                       className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{needsWarehouse}</label>
                            </div>
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

export default AddType;