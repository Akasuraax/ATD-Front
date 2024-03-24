import { useState} from "react";

import {Select, Label} from "flowbite-react";
import {IHours} from "../../interfaces/partnerScheduler";
import {useTranslation} from "react-i18next";

export default function PartnerSchedule() {

    const [schedules, setSchedules] = useState<IHours[]>([]);
    const {t} = useTranslation();

    function SelectStartComponent({day}: { day: number}) {
        const options = [];

        for (let i = 8; i <= 18; i++) {
            const heureDebut = i.toString().padStart(2, '0') + ":00h";
            const optionText = `${heureDebut}`;
            options.push(
                <option
                    key={i}
                    value={i}
                    >
                    {optionText}
                </option>
            );
        }

        return (
            <div className="max-w-md">
                <Select
                    id="time"
                    required

                    value={(schedules.filter(s => s.day === day)[0]?.start || "")}
                    onChange={e => selectDate(e.target.value, day)}
                >
                    <option key={0} value={0}>Aucun</option>
                    {options}
                </Select>
            </div>
        );
    }

    function SelectEndComponent({day}: { day: number }) {
        const options = [];

        for (let i = 8; i <= 19; i++) {
            const heureDebut = i.toString().padStart(2, '0') + ":00h";
            const optionText = `${heureDebut}`;
            options.push(
                <option
                    key={i}
                    value={i}
                    disabled={i <= (schedules.filter(s => s.day === day)[0]?.start || 0)}>
                    {optionText}
                </option>
            );
        }

        return (
            <div className="max-w-md">
                <Select
                    id="time"
                    required
                    value={(schedules.filter(s => s.day === day)[0]?.end)}
                    onChange={e => selectEndDate(e.target.value, day)}
                >
                    {options}
                </Select>
            </div>
        );
    }

    function selectDate(e, day: number) {
        if (parseInt(e) === 0) {
            const updatedSchedules = schedules.filter(s => s.day !== day);
            setSchedules(updatedSchedules);
        } else {
            const existingScheduleIndex = schedules.findIndex(s => s.day === day);
            if (existingScheduleIndex !== -1) {
                const updatedSchedules = [...schedules];
                updatedSchedules[existingScheduleIndex] = {
                    ...updatedSchedules[existingScheduleIndex],
                    start: parseInt(e),
                    end: parseInt(e) + 1
                };
                setSchedules(updatedSchedules);
            } else {
                const hours: IHours = {
                    day: day,
                    start: parseInt(e),
                    end: parseInt(e) + 1
                };
                setSchedules(prev => [...prev, hours]);
            }
        }
    }


    function selectEndDate(e, day: number) {
        const update = schedules.findIndex(s => s.day == day);

        if(update >= 0) {
            const updatedSchedules = [...schedules];
            updatedSchedules[update] = {
                ...updatedSchedules[update],
                end: parseInt(e)
            };
            setSchedules(updatedSchedules);
        }
    }


    return (
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
                {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                    <td key={day} className="px-6 py-4">
                        <SelectStartComponent
                            day={day}
                        />
                        {schedules.filter(s => s.day === day).length > 0 ? (
                            <>
                                <span className="m-2"></span>
                                <SelectEndComponent
                                    day={day}
                                />
                            </>
                        ) : <div className="h-16"></div> }
                    </td>
                ))}
            </tr>
            </tbody>
        </table>
    )
}