// @ts-ignore
import moment from "moment";
import {IUser} from "../../interfaces/user";
import {useTranslation} from "react-i18next";

export default function UserInfo({user, onButtonClick }: { user: IUser, onButtonClick: () => void }) {

    const {t} = useTranslation();

    const renderStatus = (status: number) => {
        switch (status) {
            case 0:
                return <span
                    className="bg-yellow-100 text-yellow-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">en attente</span>;
            case 1:
                return <span
                    className="bg-green-100 text-green-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">validé</span>;
            case 2:
                return <span
                    className="bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">refusé</span>
        }
    };

    return (
        <div
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:p-4 mb-4">
            <button className="float-right" onClick={onButtonClick}>
                <i className="fi fi-sr-pencil "></i>
            </button>
            <div className="p-4 md:p-8 mb-4">
                <h1 className="text-gray-900 dark:text-white text-3xl md:text-3xl font-extrabold mb-4">{user.name + " " + user.forname}</h1>
                <p className="text-m font-normal text-gray-500 dark:text-gray-400 mb-2">
                    <i className="fi fi-bs-marker mr-2"></i>
                    {user.zipcode}
                </p>
                <p className="text-m font-normal text-gray-500 dark:text-gray-400 mb-2">
                    {renderStatus(user.status)}
                </p>
                <div className={'mb-8'}></div>
                <p className="text-m font-normal text-gray-500 dark:text-gray-400 mb-0.5">{t("user.address")}</p>
                <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-4">{user.address}</p>

                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">{t("user.email")}</p>
                <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-4">{user.email}</p>

                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">{t("user.phone")}</p>
                <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-4">{user.phone_number}</p>

                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">{t("user.gender")}</p>
                <p className="text-m font-normal text-black-500 dark:text-gray-400 mb-4">{user.gender === 0
                    ? 'Homme'
                    : user.gender === 1
                        ? 'Femme'
                        : user.gender === 2
                            ? 'Non précisé'
                            : ''}</p>

                <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">{t("user.birthdayDate")}</p>
                <p className="text-m font-normal text-black-500 dark:text-gray-400">{moment(user.birth_date).format('DD/MM/YYYY')}</p>
            </div>
        </div>
    )
}