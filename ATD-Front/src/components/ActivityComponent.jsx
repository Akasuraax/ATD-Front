import abc from '../../files/image/abc.png'
import admin from '../../files/image/admin.png'
import course from '../../files/image/course.png'
import distribution from '../../files/image/distribution.png'
import donation from '../../files/image/donation.png'
import emplacement from '../../files/image/emplacement.png'
import oldCare from '../../files/image/old-care.png'
import {useTranslation} from "react-i18next";
import {getDisplayableTypes} from "../apiService/TypeService";
import {useEffect, useState} from 'react';
import {useToast} from "./Toast/ToastContex";
import {BASE_URL} from "../apiService/apiService.js";
function ActivityComponent(){

    const { t } = useTranslation();

    const titleActivity = t("activity.titleActivity");
    const foodDistribution = t("activity.foodDistribution");
    const administrativeDepartment = t("activity.administrativeDepartment");
    const shuttles = t("activity.shuttles");
    const courses  = t("activity.courses");
    const tutoring  = t("activity.tutoring");
    const event = t("activity.event");
    const seniors = t("activity.seniors");
    const [standBy, setStandBy] = useState(true);
    const [activities, setActivities] = useState([]);
    const {pushToast} = useToast();

    useEffect( ()=> {
        sendRequest()
    }, [])

    async function sendRequest(){
        setStandBy(true);
        try {
            const response = await getDisplayableTypes(pushToast);
            setActivities(response)
            setStandBy(false);
        } catch (error) {
            setStandBy(true);
        }
    }

    return (
        <div className="bg-white py-12 sm:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center homeTitle">{titleActivity}</h2>
                <div
                    className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                        {
                            activities.map((t) => (
                                <div key={t.id} className="text-center">
                                    <img
                                        className="col-span-2 max-h-24 w-full object-contain lg:col-span-1"
                                        src={BASE_URL + t.image}
                                        alt={"Photo " + t.name}
                                        width={158}
                                        height={48}
                                    />
                                    <p className="m-4">{t.description}</p>
                                </div>
                            ))
                        }
                </div>
            </div>
        </div>
    )
}

export default ActivityComponent;
