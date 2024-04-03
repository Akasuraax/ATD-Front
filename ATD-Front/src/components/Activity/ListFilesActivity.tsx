import {PaperClipIcon} from "@heroicons/react/20/solid";
import {t} from "i18next";
import {useEffect, useState} from "react";

export default function ListFilesActivity({files, onRemoveFile, metaData = true, nbChar = 30}: {
    files: File[],
    onRemoveFile: (file: File) => void,
    metaData?: boolean,
    nbChar?:number
}) {


    const [localFiles, setLocalFiles] = useState<File[]>(files);

    useEffect(() => {
        setLocalFiles(files);
    }, [files]);

    const removeFile = (value) => {

    }

    return (
        <div className={"flex flex-col justify-between"}>
            <div
                style={{maxHeight: '280px', overflowY: 'auto'}}
                className="mt-4 scroll-container">
                {localFiles.map((f) => (
                    <div key={f.name}
                         className="divide-y divide-gray-100 rounded-md border mb-4 border-gray-200">
                        <div className="flex items-center justify-between p-4 text-sm leading-6">
                            <div className="flex w-0 flex-1 items-center">
                                <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400 "
                                               aria-hidden="true"/>
                                <div className="ml-4 flex min-w-0 flex-1 gap-2 pl-2">
                                                <span
                                                    className="truncate font-medium">{f.name.length > nbChar ? `${f.name.slice(0, nbChar)}...` : f.name}
                                                </span>
                                    {metaData ? (
                                        <span
                                            className="flex-shrink-0 text-gray-400">{(f.size / (1024 * 1024)).toFixed(2)} MB
                                    </span>
                                    ) :null}
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