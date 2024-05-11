import React, {useEffect, useState} from "react";
import {schedule} from "../../interfaces/partnerScheduler";
import {useTranslation} from "react-i18next";
import { Checkbox, Label } from "flowbite-react";

export default function PartnerSchedule({onSave, prevSchedule}: {
    onSave: (arg0: schedule[]) => void,
    prevSchedule: schedule[]
}) {
    const [schedules, setSchedules] = useState<schedule[]>([]);
    const [dataLoaded, setDataLoaded] = useState(false); // Nouvel état pour suivre si les données sont chargées

    const {t} = useTranslation();

    useEffect(() => {
        if (prevSchedule && prevSchedule.length > 0) {
            setSchedules(prevSchedule);
        }
        setDataLoaded(true);
    }, [prevSchedule]);

    const onChange = (day: number) => {
        const existingDay = schedules.find(s => s.day === day);

        if (existingDay) {
            setSchedules(currentSchedules => currentSchedules.filter(s => s.day!== day));
        } else {
            setSchedules(currentSchedules =>
                [...currentSchedules, { day:day, start_hour:"08:00", end_hour:"20:00" }]
            );
        }
    };

    const save = () => {
        onSave(schedules);
    }

    if (!dataLoaded) {
        return null;
    }

    return (
        <div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="text-center px-6 py-3">
                        {t("week.monday")}
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                        {t("week.tuesday")}
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                        {t("week.wednesday")}
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                        {t("week.thursday")}
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                        {t("week.friday")}
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                        {t("week.saturday")}
                    </th>
                    <th scope="col" className="text-center px-6 py-3">
                        {t("week.sunday")}
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                    {[1, 2, 3, 4, 5, 6, 7].map(day => (
                        <td key={day} className="px-6 py-4 ">
                            <div className="flex justify-center items-center gap-2">
                                <Checkbox
                                    defaultChecked={!!schedules.find(s => s.day === day)}
                                    onChange={() => onChange(day)}
                                />
                            </div>
                        </td>
                    ))}
                </tr>
                </tbody>
            </table>
            <button
                onClick={save}
                className="text-white mt-4 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                {t("activity.addJourney")}
            </button>
        </div>
    );
}
