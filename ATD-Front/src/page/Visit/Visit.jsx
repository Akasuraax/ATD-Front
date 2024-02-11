import './visit.css'
import List from "../../components/List/List.jsx";
import {useTranslation} from "react-i18next";

function Visit(){

    const { t } = useTranslation();

    const visitsDemand = t("visit.visitsDemand");
    const lastName =  t("visit.lastName");
    const name =  t("visit.name");
    const age =  t("visit.age");
    const address =  t("visit.address");
    const zipcode =  t("visit.zipcode");
    const action =  t("visit.action");
    const accept =  t("visit.accept");
    const list = [
        {lastName:"Jean", name: "Martine", age: 98, address: "7 rue des pins perdu",zipcode:94190},
        {lastName:"Pabille", name: "Pena", age: 69, address: "5 rue des pommiers",zipcode:94190},
        {lastName:"Bob-Jean", name: "Jean-Bob", age: 90, address: "7 rue des bois perdu",zipcode:94190},
    ]

    const userActions = [
        { label: {accept}, onClick: (item) => console.log('J\'accepte', item) },
    ];

    return(
        <main>
            <div className="visit-page">
                <h2 className="text-center m-12">{visitsDemand}</h2>
                <List data={list} column={[{lastName}, {name}, {age}, {address}, {zipcode}, {action}]} actions={userActions}/>
            </div>
        </main>
    );
}

export default Visit;