import {IUser} from "./user";
import {IType} from "./type";

export interface IDemand{
    id : number
    description: string
    status: number
    user: IUser
    type: IType
    archive: boolean
    created_at:Date
}

export interface IDemandPost{
    description: string
    id_type: number
}