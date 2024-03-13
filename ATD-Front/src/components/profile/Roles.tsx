import {IUser} from "../../interfaces/user";
import {useTranslation} from "react-i18next";

export default function Roles({ user }: { user: IUser }) {

    const {t} = useTranslation();

    return (
        <div
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12 mb-8">
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-3xl font-extrabold mb-4">{t("user.role")}</h1>
            {user.roles.map((r) => (
                <p key={r.id}
                   className="text-m font-normal text-black-500 dark:text-gray-400 mb-2">{r.name}</p>
            ))}
        </div>
    )
}