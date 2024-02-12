import './vehicle.css'
import {useTranslation} from "react-i18next";
import List from "../../components/List/List.jsx";

function Vehicle(){
    const { t } = useTranslation();
    const title = t("vehicle.title");
    const addBtn = t("vehicle.addBtn");
    const name = t("vehicle.name");
    const registration = t("vehicle.registration");
    const avgConsumption = t("vehicle.avgConsumption");
    const annex = t("vehicle.annex");
    const deleteBtn = t("vehicle.delete");
    const details = t("vehicle.details");
    const consumptionFilter = t("vehicle.consumption");

    const list = [
        {name: "Véhicule 3 places", registration:"XXXX-XXXX", avgConsumption:"7,54", annex:"Saint-Quentin"},
        {name: "Véhicule 3 places", registration:"XXXX-XXXX", avgConsumption:"7,54", annex:"Saint-Quentin"},
        {name: "Véhicule 3 places", registration:"XXXX-XXXX", avgConsumption:"7,54", annex:"Saint-Quentin"},
    ]

    const userActions = [
        { label: {deleteBtn}, onClick: (item) => console.log('Supprime', item) },
        { label: {details}, onClick: (item) => console.log('J\'accepte', item) },
    ];

    const addAction = [
        {
            label: {addBtn},
            onClick: (item) => console.log('J\'accepte', item)
        }
    ];

    return(
        <main>
            <div className="m-auto visit-page">
                <h2 className="text-center m-12">{title}</h2>
                <List data={list} column={[{name}, {registration}, {avgConsumption}, {annex}]} actions={userActions} add={addAction} filter={[{consumptionFilter}]}/>
            </div>
        </main>
    )
}

export default Vehicle;