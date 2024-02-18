import React, { useEffect, useState } from "react";
import List from "../../../components/List/List.jsx";
import { useTranslation } from "react-i18next";
import { getTickets } from "../../../apiService/ticketsApi.js";
import moment from 'moment';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function TicketTracking() {
    const { t } = useTranslation();
    const ticketId = t("tracking.ticketId");
    const date = t("tracking.date");
    const type = t("tracking.type");
    const title = t("tracking.title");
    const details = t("tracking.details");
    const action = t("tracking.action");
    const ticketTrack = t("tracking.ticketTrack");

    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const ticketsData = await getTickets();
                if(ticketsData.status === 200) {
                    setTickets(ticketsData.data);
                } else {
                    console.log('else')
                }
            } catch (error) {
                console.error('Error:', error); // Ajout de cette ligne
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <main>
            <div className="m-auto visit-page">
                <h2 className="text-center m-12">{ticketTrack}</h2>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 800 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>title</TableCell>
                                <TableCell align="center">description</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">type</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tickets.map((ticket) => (
                                <TableRow
                                    key={ticket.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {ticket.title}
                                    </TableCell>
                                    <TableCell align="center">{ticket.description}</TableCell>
                                    <TableCell align="center">{moment(ticket.date).format('M/d/yyyy HH:mm')}</TableCell>
                                    <TableCell align="center">{ticket.type}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </main>
    );
}

export default TicketTracking;
