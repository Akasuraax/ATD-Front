export interface IAddRole {
    name: string;
    role_id:number;
}

export interface IRoles{
    id:number;
    name:string;
    role_id: number;
    archive:boolean;
    created_at:Date;
    update_at:Date,
}

export interface ICreatActivityRole{
    id:number,
    name:string,
    limits:ILimits
}

interface ILimits {
    max:number,
    min:number
}