import './warehouse.css'
import {useTranslation} from "react-i18next";
import List from "../../components/List/List.jsx";

function Warehouse(){

    const { t } = useTranslation();
    const title = t("warehouse.title")
    const name = t("warehouse.name");
    const address = t("warehouse.address");
    const capacity = t("warehouse.capacity");
    const addWarehouse = t("warehouse.addWarehouse");
    const deleteBtn = t("warehouse.delete");
    const details = t("warehouse.details");

    const list = [
        {name: "Saint-Quentin", address: "4 rue des pommiers", capacity:500},
        {name: "Saint-Quentin", address: "4 rue des pommiers", capacity:500},
        {name: "Saint-Quentin", address: "4 rue des pommiers", capacity:500},
    ]

    const userActions = [
        { label: {deleteBtn}, onClick: (item) => console.log('Supprime', item) },
        { label: {details}, onClick: (item) => console.log('J\'accepte', item) },
    ];

    const addAction = [
        {
            label: {addWarehouse},
            onClick: (item) => console.log('J\'accepte', item)
        }
    ];

    return(
        <main>
            <div className="m-auto visit-page">
                <h2 className="text-center m-12">{title}</h2>
                <List data={list} column={[{name}, {address}, {capacity}]} actions={userActions} add={addAction} filter={[{capacity}]}/>
            </div>
        </main>
    )
}

export default Warehouse;