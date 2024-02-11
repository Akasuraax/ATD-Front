import "../ticket.css"
import List from "../../../components/List/List.jsx";
import {useTranslation} from "react-i18next";

function TicketTracking(){

    const { t } = useTranslation();
    const ticketId = t("tracking.ticketId");
    const date = t("tracking.date");
    const type = t("tracking.type");
    const title = t("tracking.title");
    const details = t("tracking.details");
    const action = t("tracking.action");
    const ticketTrack = t("tracking.ticketTrack")
    const list = [
        {ticketId: "xxxxxx", date:"17/09/2024", type:"bug", title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"},
        {ticketId: "xxxxxx", date:"17/09/2024", type:"bug", title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"},
        {ticketId: "xxxxxx", date:"17/09/2024", type:"bug", title:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"},
    ]

    const userActions = [
        { label: {action}, onClick: (item) => console.log('J\'accepte', item) },
    ];

    return(
        <main>
            <div className="m-auto visit-page">
                <h2 className="text-center m-12">{ticketTrack}</h2>
                <List data={list} column={[{ticketId}, {date}, {type}, {title}, {details}]} actions={userActions}/>
            </div>
        </main>
)
}

export default TicketTracking;