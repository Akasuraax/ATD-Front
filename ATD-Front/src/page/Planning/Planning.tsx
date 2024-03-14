import {useTranslation} from "react-i18next";
import {useParams} from "react-router-dom";
import Calendar from "../../components/Calendar/Calendar";
import {useEffect, useState} from "react";
import {getUser} from "../../apiService/UserService";
import {IActivity} from "../../interfaces/activity";
import {getActivities} from "../../apiService/ActivityService";
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
        setStandBy(true);
        try {
            const activityResponse = await getActivities({page: 0, pageSize: 3}, pushToast);
            setActivities(activityResponse.data)
        } catch (error) {
            setStandBy(true);
        }
    }

    return (
        <main>
            <div
                style={{width: '80vw'}}
                className="flex flex-wrap min-w-full items-center mx-auto">
                <Calendar/>
            </div>
        </main>
    )

}