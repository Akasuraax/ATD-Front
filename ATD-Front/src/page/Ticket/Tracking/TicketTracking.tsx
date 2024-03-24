import React, {useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import {getMyTickets} from "../../../apiService/TicketService";
import {useToast} from "../../../components/Toast/ToastContex";
import {useNavigate} from 'react-router-dom';

import moment from 'moment';

import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useAuth} from "../../../AuthProvider.jsx";
import {ITicketMine} from "../../../interfaces/ticket";
import {Spinner} from "flowbite-react";

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function TicketTracking() {
    const {t} = useTranslation();
    const date = t("tracking.date");
    const type = t("tracking.type");
    const title = t("tracking.title");
    const details = t("tracking.details");
    const action = t("tracking.action");
    const ticketTrack = t("tracking.ticketTrack");
    const auth = useAuth()
    const navigate = useNavigate();


    const [tickets, setTickets] = useState<ITicketMine[]>();
    const {pushToast} = useToast();
    const [standBy, setStandBy] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const ticketsData = await getMyTickets(auth.user.id, pushToast);
                if (ticketsData !== null) {
                    setTickets(ticketsData.tickets);
                    setStandBy(false)
                }

            } catch (error) {
                setStandBy(true);
            }
        };
        fetchData()
    }, []);


    return (
        <main>
            <div className="flex flex-wrap max-w-full items-center mx-auto">
                {standBy ? (
                    <Spinner color="pink" aria-label="Extra large spinner example" size="xl"/>
                ) : (
                    <div
                        className="h-full pt-32"
                        style={{width: "80vw", maxWidth: "1248px"}}>
                        <div className="text-center mb-8">
                            <h2 className="mb-12 text-4xl tracking-tight text-center dark:text-white">{ticketTrack}</h2>
                        </div>
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead
                                className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">
                                    {title}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    {details}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    {date}
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    {type}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {tickets.map((ticket) => (
                                <tr
                                    onClick={()=> (
                                        navigate(`/ticket/${ticket.id}`)
                                    )}
                                    style={{ cursor: 'pointer' }}
                                    key={ticket.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                >
                                    <th scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {ticket.title}
                                    </th>
                                    <td className="px-6 py-4">
                                        {ticket.description.length > 30 ? `${ticket.description.substring(0, 30)}...` : ticket.description}
                                    </td>
                                    <td className="px-6 py-4">
                                        {moment(ticket.created_at).format('DD/MM/yyyy HH:mm')}
                                    </td>
                                    <td className="px-6 py-4">
                                        {ticket.problem}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </main>
    )
        ;
}

export default TicketTracking;
