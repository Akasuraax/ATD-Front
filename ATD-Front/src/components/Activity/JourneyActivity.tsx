import {t} from "i18next";
import {useEffect, useState} from "react";
import {ISteps} from "../../interfaces/activity";

export default function JourneyActivity({journey}: {
    journey: ISteps[]
}) {

    const [travel, setTravel] = useState<ISteps[]>([])

    useEffect(() => {
        if (Array.isArray(journey)) {
            setTravel(journey);
        } else {
            console.error('journey doit être un tableau');
        }
        console.log(journey);
    }, [journey]);

    return (
        <>
            <div className="flex w-full h-full items-start"
                 style={{height: '320px'}}>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-3 w-full p-2 rounded h-full">
                    <div className={"h-full w-full scroll-container"} style={{overflow: "auto"}}>
                        <ol className="relative m-4 border-s border-gray-200 dark:border-gray-700">
                            {travel.map(s =>
                            <li key={s.id} className="ms-6 p-4">
                                <span
                                    className="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-gray-900 dark:bg-blue-900">
                                    <svg className="w-2.5 h-2.5 text-blue-800 dark:text-blue-300" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                        <path
                                            d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                    </svg>
                                </span>
                                <h3 className="mb-1 text-lg font-semibold text-gray-900 dark:text-white">{s.address}</h3>
                            </li>
                            )}
                        </ol>
                    </div>
                </dd>
            </div>
        </>
    )
}