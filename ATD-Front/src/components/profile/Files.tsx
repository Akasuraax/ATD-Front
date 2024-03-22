import {IUser} from "../../interfaces/user";
import {useTranslation} from "react-i18next";
import {PaperClipIcon} from "@heroicons/react/20/solid";
import {getUserFiles, downloadFile, deleteFile} from "../../apiService/UserService";
import {useToast} from "../Toast/ToastContex";
import {useEffect, useState} from "react";
import {IFile} from "../../interfaces/user";
import {postFile} from "../../apiService/UserService";

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
            const response = await downloadFile(id, pushToast);
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

    async function deleteUserFile(id, idFile){
        try {
            await deleteFile(id, idFile, pushToast);
            setFiles(prevFiles => prevFiles.filter(file => file.id !== idFile));
        } catch (error) {
            console.error('Error deleting file:', error);
        }
    }

    async function save(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);

        const fileInput = formData.get("link") as File;

        const file: IFile = {
            name: mapValueToName(formData.get("name")) as string,
            link: fileInput
        };

        try {
            const response = await postFile(user.id, file, pushToast);
            const newFile = response.data.file;
            setFiles(prevFiles => [...prevFiles, newFile]);
        } catch (error) {
            console.error(error);
        }
    }

    function mapValueToName(value) {
        switch (value) {
            case "1":
                return "Permis de conduire";
            case "2":
                return "Casier judiciaire";
            case "3":
                return "Revenu Fiscal";
            case "4":
                return "Autre";
            default:
                return "";
        }
    }

    const {t} = useTranslation();

    return (
        <div
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8  md:p-12 mb-8">
            <h1 className="text-gray-900 dark:text-white text-3xl md:text-3xl font-extrabold mb-4">{t("user.file")}</h1>
            {files.map(function (data) {
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
                                    <button
                                        onClick={() => downloadUserFile(data["id"], data["link"].replace(/.*\//, ''))}>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                             viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"/>
                                        </svg>
                                    </button>
                                    <button
                                        onClick={() => deleteUserFile(user.id, data["id"])}>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                                             xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                                             viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
            )
            })}

                <form onSubmit={save}>
                <div className="flex items-center">
                    <input
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                        name="link" type="file"/>
                    <select id="selectOption" name="name"
                            className="ml-2 bg-gray-100 text-gray-800 border border-gray-300 rounded px-5 py-2.4">
                        <option value="1">Permis de conduire</option>
                        <option value="2">Casier judiciaire</option>
                        <option value="3">Revenu Fiscal</option>
                        <option value="4">Autre</option>
                    </select>
                </div>
                <button type="submit"
                        className="text-white text-sm px-5 py-2.5 mt-4 outline-none rounded w-max cursor-pointer block m-auto"
                        style={{backgroundColor: '#F85866'}}>
                    Submit
                </button>
            </form>
        </div>
    )
}