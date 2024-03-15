import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import Calendar from "../../components/Calendar/Calendar";
import {useEffect, useState} from "react";
import {getUser} from "../../apiService/UserService";
import {IActivity} from "../../interfaces/activity";
import {getActivitiesBetween} from "../../apiService/ActivityService";
import {useToast} from "../../components/Toast/ToastContex";

export default function Planning() {

    const {t} = useTranslation();
    const {userId} = useParams();
    const [activities, setActivities] = useState<IActivity[] | null>([]);
    const [standBy, setStandBy] = useState(true);
    const {pushToast} = useToast();


    useEffect(() => {
        request();
    }, []);


    async function request() {
        const date = {
            startDate: "2024-03-10",
            endDate: "2024-03-20"
        }
        setStandBy(true);
        try {
            const activityResponse = await getActivitiesBetween(date, pushToast);
            console.log(activityResponse)
            setActivities(activityResponse.data)
        } catch (error) {
            setStandBy(true);
        }
    }

    async function handleDatesSet(e) {
        const date = {
            startDate: e.startStr,
            endDate: e.endStr
        }
        setStandBy(true);
        try {
            const activityResponse = await getActivitiesBetween(date, pushToast);
            setActivities(activityResponse.data)
            console.log(activities)
            setStandBy(false)
        } catch (error) {
            setStandBy(true);
        }
    }

    return (
        <main>
            <div
                style={{width: '80vw'}}
                className="flex flex-wrap min-w-full items-center mx-auto">
                <Calendar
                handleDatesSet={handleDatesSet}
                />
            </div>
        </main>
    )

}