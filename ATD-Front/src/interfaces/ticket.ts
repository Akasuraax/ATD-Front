export interface ITicket {
    title:string,
    description:string,
    type:number,
    status?:number,
    severity?:number
}

export class Ticket implements ITicket {
    title:string;
    description:string;
    type:number;
    status:number;
    severity:number;

    constructor(title:string,description:string,type:number,status?:number,severity?:number) {
        this.title = title;
        this.description = description;
        this.type = type;
        this.status = status;
        this.severity = severity;
    }
}