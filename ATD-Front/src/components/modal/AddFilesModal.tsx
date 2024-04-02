import {Button, Checkbox, CustomFlowbiteTheme, FileInput, Label, Modal, TextInput} from "flowbite-react";
import {useEffect, useRef, useState} from "react";
import Select from "@mui/material/Select";
import {getAllRoles} from "../../apiService/RoleService";
import {useToast} from "../Toast/ToastContex";
import MenuItem from "@mui/material/MenuItem";
import {t} from "i18next";
import {ICreatActivityRole} from "../../interfaces/role";
import {PaperClipIcon} from "@heroicons/react/20/solid";

export default function AddRoleModal({setOpenModal, activityId, openModal}: {
    setOpenModal: (value: boolean) => void,
    activityId:number,
    openModal:boolean
}) {

    const {pushToast} = useToast();
    const emailInputRef = useRef<HTMLInputElement>(null);
    const customTheme: CustomFlowbiteTheme['modal'] = {
        "root": {
            "base": "fixed top-0 right-0 left-0 z-50 h-modal h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
            "show": {
                "on": "flex bg-opacity-50 dark:bg-opacity-80",
                "off": "hidden"
            },
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        const filesDrop: File[] = event.dataTransfer.files;
        const filesArray = Array.from(filesDrop);
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        const verify = filesArray.filter(f => {
            if (f.size > 20971520) {
                pushToast({
                    content: "La taille du fichier dépasse 20Mo",
                    type: "failure"
                });
                return;
            } else if (!allowedTypes.includes(f.type)) {
                pushToast({
                    content: "Type de fichier non pris en charge",
                    type: "failure"
                });
                return;
            }
            return f;
        })

        const uniqueFiles = verify.filter(file => files.some(existingFile => existingFile.name === file.name));
        if (uniqueFiles.length === 0) {
            setFiles(
                [...files, ...verify]
            );
        } else {
            pushToast({
                content: "Le nom du file est déja pris",
                type: "failure"
            });
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const save = (e) => {
        e.preventDefault()

        const formData = new FormData(form);
        const file = {
            id:activityId,

        };
    }

    return (
        <Modal theme={customTheme} show={openModal} size="md" popup onClose={() => setOpenModal(false)}
               initialFocus={emailInputRef}>
            <Modal.Header/>
            <Modal.Body>
                <form onSubmit={save} encType="multipart/form-data" action="">
                    <div className="flex w-full items-center justify-center">
                        <Label
                            onDrop={handleDrop}
                            onDragOver={handleDragOver}
                            htmlFor="dropzone-file"
                            className="dark:hover:bg-bray-800 flex h-36 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                        >
                            <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                <svg
                                    className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 16"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                    />
                                </svg>
                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span
                                                className="font-semibold">{t('createActivity.upload')}</span> {t('createActivity.drag')}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">PNG, PDF, JPG; JPEG</p>
                            </div>
                            <FileInput id="dropzone-file" className="hidden"/>
                        </Label>
                    </div>
                </form>
            </Modal.Body>
        </Modal>
    )
}
