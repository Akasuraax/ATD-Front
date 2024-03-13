import {IUser} from "../../interfaces/user";
import {useTranslation} from "react-i18next";
import {PaperClipIcon} from "@heroicons/react/20/solid";

export default function Files({user}: { user: IUser }) {

    const {t} = useTranslation();

    return (
        <div
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8  md:p-12 mb-8">
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-3xl font-extrabold mb-4">{t("user.file")}</h1>
            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">Revenue
                fiscal</p>
            <div className="divide-y divide-gray-100 rounded-md border mb-4 border-gray-200">
                <div className="flex items-center justify-between p-4 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400 "
                                       aria-hidden="true"/>
                        <div className="ml-4 flex min-w-0 flex-1 gap-2 pl-2">
                                                <span
                                                    className="truncate font-medium">Revenue fiscal.pdf</span>
                            <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                        </div>
                    </div>
                    <div className="ml-4 pl-2 flex-shrink-0">
                        <button>Télécharger</button>
                    </div>
                </div>
            </div>

            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">Permis</p>
            <div className="divide-y divide-gray-100 rounded-md border mb-4 border-gray-200">
                <div className="flex items-center justify-between p-4 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400 "
                                       aria-hidden="true"/>
                        <div className="ml-4 flex min-w-0 flex-1 gap-2 pl-2">
                                                <span
                                                    className="truncate font-medium">Permis.pdf</span>
                            <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                        </div>
                    </div>
                    <div className="ml-4 pl-2 flex-shrink-0">
                        <button>Télécharger</button>
                    </div>
                </div>
            </div>

            <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">Cassier
                judiciaire</p>
            <div className="divide-y divide-gray-100 rounded-md border mb-4 border-gray-200">
                <div className="flex items-center justify-between p-4 text-sm leading-6">
                    <div className="flex w-0 flex-1 items-center">
                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400 "
                                       aria-hidden="true"/>
                        <div className="ml-4 flex min-w-0 flex-1 gap-2 pl-2">
                                                <span
                                                    className="truncate font-medium">Cassier judiciaire.pdf</span>
                            <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                        </div>
                    </div>
                    <div className="ml-4 pl-2 flex-shrink-0">
                        <button>Télécharger</button>
                    </div>
                </div>
            </div>
        </div>
    )
}