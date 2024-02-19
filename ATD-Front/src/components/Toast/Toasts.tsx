import * as React from 'react';
import { Toast } from 'flowbite-react';
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi';

type Props = {
    content?: string;
    type?: "success" | "failure" | "warning";
};

export function ToastF({content, type = "success"}:Props) {

    let balise;
    let css;
    switch (type) {
        case "success":
            balise = <HiCheck className="h-5 w-5" />;
            css="bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200";
            break;
        case "failure":
            balise = <HiX className="h-5 w-5" />;
            css="bg-red-100 text-red-500 dark:bg-red-800 dark:text-red-200";
            break;
        case "warning":
            balise = <HiExclamation className="h-5 w-5" />;
            css="bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200";
            break;
        default:
            balise = <HiCheck className="h-5 w-5" />;
            css="bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200";
    }


    return (
        <Toast>
            <div className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${css}`}>
                {balise}
            </div>
            <div className="ml-3 text-sm font-normal">{content}.</div>
            <Toast.Toggle />
        </Toast>
    )
}