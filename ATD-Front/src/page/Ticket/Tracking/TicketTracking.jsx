import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getTickets } from "../../../apiService/ticketsApi.js";
import {useToast} from "../../../components/Toast/ToastContex";
import ListPlaceholder from "../../../components/skeleton/ListPlaceholder";

import moment from 'moment';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


function TicketTracking() {
    const { t } = useTranslation();
    const date = t("tracking.date");
    const type = t("tracking.type");
    const title = t("tracking.title");
    const details = t("tracking.details");
    const action = t("tracking.action");
    const ticketTrack = t("tracking.ticketTrack");

    const [tickets, setTickets] = useState([]);
    const { pushToast } = useToast();
    const [standBy, setStandBy] = useState(false);


    useEffect(() => {
        setStandBy(true)
        const fetchData = async () => {
            const ticketsData = await getTickets(pushToast);
            if(ticketsData !== null) {
                setTickets(ticketsData);
                setStandBy(false)
            }
        };

        fetchData();
    }, []);

    return (
        <main>
            <div className="m-auto visit-page">
                <h2 className="text-center m-12">{ticketTrack}</h2>
                {standBy ? (
                    <ListPlaceholder/>
                ): (
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 800 }} aria-label="customized table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>{title}</TableCell>
                                        <TableCell align="center">{details}</TableCell>
                                        <TableCell align="center">{date}</TableCell>
                                        <TableCell align="center">{type}</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {tickets.map((ticket) => (
                                        <StyledTableRow
                                            key={ticket.id}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <StyledTableCell  component="th" scope="row">
                                                {ticket.title}
                                            </StyledTableCell >
                                            <StyledTableCell align="center">
                                                {ticket.description.length > 30
                                                    ? `${ticket.description.substring(0, 30)}...`
                                                    : ticket.description
                                                }
                                            </StyledTableCell>
                                            <StyledTableCell  align="center">
                                                {moment(ticket.created_at).format('DD/MM/yyyy HH:mm')}</StyledTableCell >
                                            <StyledTableCell  align="center">{ticket.type}</StyledTableCell >
                                        </StyledTableRow >
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
            </div>
        </main>
    );
}

export default TicketTracking;
