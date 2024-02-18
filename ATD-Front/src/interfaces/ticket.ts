export interface ITicket {
    title: string;
    description: string;
    type: number;
}

export interface ITicketApi {
    title: string;
    description: string;
    type: number;
    status: number;
    severity: number;
    archive: boolean;
    updated_at: string;
    created_at: string;
    id: number;
}