import abc from '../../files/image/abc.png'
import admin from '../../files/image/admin.png'
import course from '../../files/image/course.png'
import distribution from '../../files/image/distribution.png'
import donation from '../../files/image/donation.png'
import emplacement from '../../files/image/emplacement.png'
import oldCare from '../../files/image/old-care.png'
import {useTranslation} from "react-i18next";

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

    return (
        <div className="bg-white py-12 sm:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <h2 className="text-center homeTitle">{titleActivity}</h2>
                <div
                    className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
                    <div className="text-center	">
                        <img
                            className="col-span-2 max-h-24 w-full object-contain lg:col-span-1"
                            src={abc}
                            alt="Transistor"
                            width={158}
                            height={48}
                        />
                        <p className="m-4">{tutoring}</p>
                    </div>
                    <div className="text-center	">
                        <img
                            className="col-span-2 max-h-24 w-full object-contain lg:col-span-1"
                            src={admin}
                            alt="Reform"
                            width={158}
                            height={48}
                        />
                        <p className="m-4">{administrativeDepartment}</p>
                    </div>
                    <div className="text-center	">
                        <img
                            className="col-span-2 max-h-24 w-full object-contain lg:col-span-1"
                            src={course}
                            alt="Tuple"
                            width={158}
                            height={48}
                        />
                        <p className="m-4">{courses}</p>
                    </div>
                    <div className="text-center	">
                        <img
                            className="col-span-2 max-h-24 w-full object-contain sm:col-start-2 lg:col-span-1"
                            src={distribution}
                            alt="SavvyCal"
                            width={158}
                            height={48}
                        />
                        <p className="m-4">{foodDistribution}</p>
                    </div>
                    <div className="text-center	">
                        <img
                            className="col-span-2 col-start-2 max-h-24 w-full object-contain sm:col-start-auto lg:col-span-1"
                            src={donation}
                            alt="Statamic"
                            width={158}
                            height={48}
                        />
                        <p className="m-4">{event}</p>
                    </div>
                    <div className="text-center	">
                        <img
                            className="col-span-2 col-start-2 max-h-24 w-full object-contain sm:col-start-auto lg:col-span-1"
                            src={emplacement}
                            alt="Statamic"
                            width={158}
                            height={48}
                        />
                        <p className="m-4">{shuttles}</p>
                    </div>
                    <div className="text-center	">
                        <img
                            className="col-span-2 col-start-2 max-h-24 w-full object-contain sm:col-start-auto lg:col-span-1"
                            src={oldCare}
                            alt="Statamic"
                            width={158}
                            height={48}
                        />
                        <p className="m-4 font">{seniors}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ActivityComponent;
