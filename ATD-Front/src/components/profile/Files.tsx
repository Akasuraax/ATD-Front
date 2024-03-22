import {IUser} from "../../interfaces/user";
import {useTranslation} from "react-i18next";
import {PaperClipIcon} from "@heroicons/react/20/solid";
import {getUserFiles, downloadFile} from "../../apiService/UserService";
import {useToast} from "../Toast/ToastContex";
import {useEffect, useState} from "react";
import axios from 'axios'

export default function Files({user}: { user: IUser }) {
    const { pushToast } = useToast();
    const [files, setFiles] = useState([]);

    useEffect(() => {
        sendRequest();
    }, []);

    async function sendRequest(){
        try{
            const response = await getUserFiles(user.id, pushToast);
            setFiles(response.data);
        }catch (error) {
            console.log(error)
        }
    }

    async function downloadUserFile(id, filename) {
        try {
            const response = await downloadFile(id);
            const fileUrl = window.URL.createObjectURL(new Blob([response.data]));

            const link = document.createElement('a');
            link.href = fileUrl;
            link.setAttribute('download', filename);

            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            URL.revokeObjectURL(fileUrl);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    }

    const {t} = useTranslation();

    return (
        <div
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8  md:p-12 mb-8">
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-3xl font-extrabold mb-4">{t("user.file")}</h1>
            {files.map(function(data){
                return (
                    <>
                        <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-0.5">{data["name"]}</p>
                        <div className="divide-y divide-gray-100 rounded-md border mb-4 border-gray-200">
                            <div className="flex items-center justify-between p-4 text-sm leading-6">
                                <div className="flex w-0 flex-1 items-center">
                                    <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400 "
                                                   aria-hidden="true"/>
                                    <div className="ml-4 flex min-w-0 flex-1 gap-2 pl-2">
                                    <span
                                        className="truncate font-medium">{data["link"].replace(/.*\//, '')}</span>
                                    </div>
                                </div>
                                <div className="ml-4 pl-2 flex-shrink-0">
                                    <button onClick={() => downloadUserFile(data["id"], data["link"].replace(/.*\//, ''))}>Télécharger</button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}
        </div>
    )
}