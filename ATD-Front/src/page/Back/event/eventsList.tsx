import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import React, {useState} from "react";
import {IActivity} from "../../../interfaces/activity";
import {getActivitiesBetween} from "../../../apiService/ActivityService";
import {useToast} from "../../../components/Toast/ToastContex";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import ActivivityModal from "../../../components/modal/activityModal";
import CreateActivivityModal from "../../../components/modal/CreateActivityModal";


export default function EventsList() {

    const {t} = useTranslation();
    const [activities, setActivities] = useState<IActivity[] | null>([]);
    const [createModal, setCreateModal] = useState<boolean>(false);

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
        console.log('oui ? ')
    }

    function createEvent(selectInfo) {

        setCreateModal(true)

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
                        editable={true}
                        selectable={true}
                        datesSet={handleDatesSet}
                        weekends={true}
                        locale='fr'
                        select={createEvent}
                        events={activities}
                        eventContent={renderEventContent} // custom render function
                        eventClick={handleEventClick}
                    />
                </div>
            </div>
            {createModal ? (
                <CreateActivivityModal
                    setOpenModal={(v) => (setCreateModal(v))}
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