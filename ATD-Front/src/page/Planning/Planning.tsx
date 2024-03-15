import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import Calendar from "../../components/Calendar/Calendar";
import React, {useEffect, useState} from "react";
import {getUser} from "../../apiService/UserService";
import {IActivity} from "../../interfaces/activity";
import {getActivitiesBetween} from "../../apiService/ActivityService";
import {useToast} from "../../components/Toast/ToastContex";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {formatDate} from "@fullcalendar/core";
import {Spinner} from "flowbite-react";
import ActivivityModal from "../../components/modal/activityModal";

export default function Planning() {

    const {t} = useTranslation();
    const {userId} = useParams();
    const [activities, setActivities] = useState<IActivity[] | null>([]);
    const [standBy, setStandBy] = useState(false);
    const [selectActivity, setSelectActivity] = useState<IActivity | null>(null);
    const [modal, setModal] = useState(false);

    const {pushToast} = useToast();


    async function handleDatesSet(e) {
        const date = {
            startDate: e.startStr,
            endDate: e.endStr
        }
        try {
            const activityResponse = await getActivitiesBetween(date, pushToast);
            setActivities(activityResponse)
        } catch (error) {
            console.log(error)
        }
    }

    function handleEventClick(clickInfo) {
        const activity = activities.find(a => clickInfo.event.id == a.id);
        setSelectActivity(activity)
        setModal(true)
    }

    return (
        <main>
            <div
                style={{width: '80vw'}}
                className="flex flex-wrap min-w-full items-center mx-auto">
                <div className='w-full'>
                    <FullCalendar
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        headerToolbar={{
                            left: 'prev,next today',
                            center: 'title',
                            right: 'dayGridMonth,timeGridWeek'
                        }}
                        initialView='timeGridWeek'
                        height={"70vh"}
                        selectable={false}
                        datesSet={handleDatesSet}
                        weekends={true}
                        locale='fr'
                        events={activities}
                        eventContent={renderEventContent} // custom render function
                        eventClick={handleEventClick}
                    />
                </div>
            </div>
            {modal ? (
                <ActivivityModal
                    setOpenModal={(v) => (setModal(v))}
                    activity={selectActivity}
                />
            ) : null}
        </main>
    )

    function renderEventContent(eventInfo) {
        return (
            <>
                <b>{eventInfo.timeText}</b>
                <h1 className="md:text-lg ml-1"> {eventInfo.event.title}</h1>
            </>
        )
    }
}