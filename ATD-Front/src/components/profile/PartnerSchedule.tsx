import React, { useEffect, useState } from "react";
import { Select } from "flowbite-react";
import { schedule } from "../../interfaces/partnerScheduler";
import { useTranslation } from "react-i18next";

export default function PartnerSchedule({ onSave, prevSchedule }: { onSave: (arg0: schedule[]) => void, prevSchedule: schedule[] }) {
    const [schedules, setSchedules] = useState<schedule[]>([]);
    const { t } = useTranslation();

    useEffect(() => {
        if (prevSchedule && prevSchedule.length > 0) {
            setSchedules(prevSchedule);
        }
    }, [prevSchedule]);

    const handleTimeChange = (day: number, timeType: 'start' | 'end', value: string) => {
        setSchedules(prevSchedules => {
            const updatedSchedules = [...prevSchedules];
            const scheduleIndex = updatedSchedules.findIndex(schedule => schedule.day === day);
            if (scheduleIndex !== -1) {
                const schedule = updatedSchedules[scheduleIndex];
                const date = new Date(`1970-01-01T${value}`);
                const hours = date.getHours();

                if (hours < 8 || hours > 18) {
                    return prevSchedules;
                }

                if (timeType === 'start') {
                    schedule.start_hour = value;
                    if (schedule.end_hour && new Date(`1970-01-01T${schedule.end_hour}`) < date) {
                        schedule.end_hour = '';
                    }
                } else if (timeType === 'end') {
                    schedule.end_hour = value;
                    if (schedule.start_hour && new Date(`1970-01-01T${schedule.start_hour}`) > date) {
                        schedule.start_hour = '';
                    }
                }
            }
            return updatedSchedules;
        });
    };

    const save = () => {
        onSave(schedules);
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
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => {
                        const scheduleForDay = schedules.find(schedule => schedule.day === day);
                        const startHour = scheduleForDay ? scheduleForDay.start_hour : '';
                        const endHour = scheduleForDay ? scheduleForDay.end_hour : '';

                        return (
                            <td key={day} className="px-6 py-4">
                                <input
                                    type="time"
                                    required={false}
                                    name="start_date"
                                    value={startHour}
                                    onChange={(e) => handleTimeChange(day, 'start', e.target.value)}
                                    style={{
                                        borderBottom: '1px solid black',
                                        borderLeft: 'none',
                                        borderRight: 'none',
                                        borderTop: 'none',
                                        margin: '0',
                                        padding: '0',
                                        fontSize: '0.875rem',
                                        marginRight: '10px'
                                    }}
                                />
                                <input
                                    type="time"
                                    required={false}
                                    name="end_date"
                                    value={endHour}
                                    onChange={(e) => handleTimeChange(day, 'end', e.target.value)}
                                    style={{
                                        borderBottom: '1px solid black',
                                        borderLeft: 'none',
                                        borderRight: 'none',
                                        borderTop: 'none',
                                        margin: '0',
                                        padding: '0',
                                        fontSize: '0.875rem',
                                        marginRight: '10px'
                                    }}
                                />
                            </td>
                        );
                    })}
                </tr>
                </tbody>
            </table>
            <button
                onClick={save}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                {t("activity.addJourney")}
            </button>
        </div>
    )
}
