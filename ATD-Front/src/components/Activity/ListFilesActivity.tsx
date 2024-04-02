import {IActivityProduct} from "../../interfaces/product";
import {FileInput, Label} from "flowbite-react";
import {PaperClipIcon} from "@heroicons/react/20/solid";
import {useEffect, useState} from "react";
import {useToast} from "../Toast/ToastContex";
import {t} from "i18next";

export default function ListFilesActivity({prevFiles, onActivityFilesChange}: {
    prevFiles: File[],
    onActivityFilesChange: (files:File[]) => void
}) {

    const [files, setFiles] = useState<File[]>([])
    const {pushToast} = useToast();

    const removeFile = (value) => {
        setFiles([
            ...files.filter(f => f.name !== value)
        ])
    }

    useEffect(() => {
        onActivityFilesChange(files)
    }, [files]);


    return (
        <div className={"flex flex-col h-full justify-between"}>
            <div
                style={{maxHeight: '250px', overflowY: 'auto'}}
                className="mt-4">
                {files.map((f) => (
                    <div key={f.name}
                         className="divide-y divide-gray-100 rounded-md border mb-4 border-gray-200">
                        <div className="flex items-center justify-between p-4 text-sm leading-6">
                            <div className="flex w-0 flex-1 items-center">
                                <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400 "
                                               aria-hidden="true"/>
                                <div className="ml-4 flex min-w-0 flex-1 gap-2 pl-2">
                                                <span
                                                    className="truncate font-medium">{f.name.length > 30 ? `${f.name.slice(0, 20)}...` : f.name}</span>
                                    <span
                                        className="flex-shrink-0 text-gray-400">{(f.size / (1024 * 1024)).toFixed(2)} MB</span>
                                </div>
                            </div>
                            <div className="ml-4 pl-2 flex-shrink-0">
                                <button
                                    onClick={() => removeFile(f.name)}
                                    className="font-medium text-red-600 dark:text-red-500 hover:underline">{t('createActivity.remove')}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}