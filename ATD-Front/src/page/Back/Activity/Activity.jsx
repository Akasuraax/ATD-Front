import './activity.css'
import {useTranslation} from "react-i18next";
import List from "../../../components/List/List.jsx";
import {useNavigate} from "react-router-dom";

function ActivityList(){
    const { t } = useTranslation();
    const title = t("activity.back.title");
    const name = t("activity.back.name");
    const needsVehicle = t("activity.back.needsVehicle");
    const needsWarehouse = t("activity.back.needsWarehouse");
    const addActivity = t("activity.back.addActivity");
    const deleteBtn = t("activity.back.delete");
    const details = t("activity.back.details");

    const list = [
        {name: "Aide aux personnes agées", needsVehicle:"non", needsWarehouse:"oui"},
        {name: "Aide aux personnes agées", needsVehicle:"non", needsWarehouse:"oui"},
        {name: "Aide aux personnes agées", needsVehicle:"non", needsWarehouse:"oui"}
    ]

    const userActions = [
        { label: {deleteBtn}, onClick: (item) => console.log('Supprime', item) },
        { label: {details}, onClick: (item) => console.log('J\'accepte', item) },
    ];

    const navigate = useNavigate();

    const add = () => {
        navigate('add');
    };

    const addAction = [
        {
            label: {addActivity},
            onClick: () => add()
        }
    ];


    return(
        <main>
            <div className="m-auto visit-page">
                <h2 className="text-center m-12">{title}</h2>
                <List data={list} column={[{name}, {needsVehicle}, {needsWarehouse}]} actions={userActions} add={addAction} filter={[{name}]}/>
            </div>
        </main>
    )


}

export default ActivityList;