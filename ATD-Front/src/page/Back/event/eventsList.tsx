
import {useTranslation} from "react-i18next";
import {useNavigate, useParams} from "react-router-dom";
import React, {useState} from "react";
import {IActivity, IAddActivity} from "../../../interfaces/activity";
import {getActivitiesBetween, patchActivity, postActivity} from "../../../apiService/ActivityService";
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
    const [date, setDate] = useState<Date[]>([]);
    const [dates,setDates] = useState({})
    const navigate = useNavigate();


    const {pushToast} = useToast();


    async function handleDatesSet(e) {
        const date = {
            startDate: e.startStr,
            endDate: e.endStr
        }
        setDates(date)
        try {
            const activityResponse = await getActivitiesBetween(date, pushToast);
            setActivities(activityResponse)
        } catch (error) {
            console.log(error)
        }
    }

    function handleEventClick(clickInfo) {
        const activity = activities.find(a => clickInfo.event.id == a.id);
        navigate(`${activity.id}`)
    }

    function createEvent(selectInfo) {
        setDate([selectInfo.startStr,selectInfo.endStr])
        setCreateModal(true)
    }

    async function saveActivity(activity:IAddActivity) {
        try {
            const respons = await postActivity(activity, pushToast);
            const activityResponse = await getActivitiesBetween(dates, pushToast);
            setActivities(activityResponse)
        } catch (error) {
            console.log(error)
        }
    }

    const eventResize = async (e) => {
        const activity = activities.find(a => e.event.id == a.id);
        activity.start_date = e.event.start
        activity.end_date = e.event.end

        try {
            const res = await patchActivity(activity,pushToast, activity.id)
        } catch (error) {
            console.log(error)
        }
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
                        eventChange={eventResize}
                        events={activities}
                        eventContent={renderEventContent} // custom render function
                        eventClick={handleEventClick}
                    />
                </div>
            </div>
            {createModal ? (
                <CreateActivivityModal
                    setOpenModal={(v) => (setCreateModal(v))}
                    start_date={date[0]}
                    end_date={date[1]}
                    newActivity={saveActivity}
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