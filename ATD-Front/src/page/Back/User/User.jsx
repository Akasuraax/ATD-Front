import './user.css'
import List from "../../../components/List/List.jsx";
import {useTranslation} from "react-i18next";

function User(){
    const { t } = useTranslation();
    const title = t("user.title");
    const lastName = t("user.lastName");
    const name = t("user.name");
    const role = t("user.role");
    const isArchived = t("user.isArchived");
    const informations = t("user.informations");
    const action = t("user.action");
    const downloadData = t("user.downloadData");
    const partner = t("user.partner");
    const beneficiary = t("user.beneficiary");
    const volunteer = t("user.volunteer");
    const waitingValidation = t("user.waitingValidation");

    const list = [
        {lastName: "BOB", name:"Jean", role:"Bénévole", isArchived:"Non"},
        {lastName: "BOB", name:"Jean", role:"Bénévole", isArchived:"Non"},
        {lastName: "BOB", name:"Jean", role:"Bénévole", isArchived:"Non"},
        {lastName: "BOB", name:"Jean", role:"Bénévole", isArchived:"Non"},
    ]

    const userActions = [
        { label: {informations}, onClick: (item) => console.log('J\'accepte', item) },
        { label: {action}, onClick: (item) => console.log('J\'accepte', item) },
        { label: {downloadData}, onClick: (item) => console.log('J\'accepte', item) },
    ];

    return(
        <main>
            <div className="m-auto">
                <h2 className="text-center m-12">{title}</h2>
                <List data={list} column={[{lastName}, {name}, {role}, {isArchived}]} actions={userActions} filter={[{partner}, {beneficiary}, {volunteer}, {waitingValidation}]}/>
            </div>
        </main>
    )
}

export default User;