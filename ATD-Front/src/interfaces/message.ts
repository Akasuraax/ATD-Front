import {IUsername} from "./user";

export interface IMessage{
    id:number,
    description: string,
    created_at: string,
    user : IUsername
}