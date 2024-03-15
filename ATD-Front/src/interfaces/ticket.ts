export interface ITicket {
    id: number;
    title: string;
    description: string;
    type: number;
    status: number;
    severity: number;
    archive: boolean;
    updated_at: string;
    created_at: string;
}

export interface ITicketMine{
    id: number;
    title: string;
    description: string;
    status: number;
    problem: string,
    archive: boolean
    created_at: string;
}