import {schedule} from "./partnerScheduler";

export interface IUser {
    id: number;
    name: string;
    forname: string;
    phone_country?: string;
    phone_number?: string;
    address: string;
    zipcode: string;
    password: string;
    visited: boolean;
    email: string;
    birth_date: Date;
    status: number,
    gender: number;
    compagny?: string;
    siret_number?: string;
    updated_at: string;
    created_at: string;
    roles: IRole[];
    ban:boolean;
    archive:boolean;
    schedules?:schedule[]
}

export interface IRole {
    id: number;
    name: string;
    archive: boolean;
    created_at: string;
    updated_at: string;
}

export interface ISendBeneficiary {
    forname : string,
    name : string,
    birth_date : Date,
    gender : number,
    email : string,
    phone_number : number,
    zipcode : number,
    address : string,
    password : string
}

export interface ISendPartner {
    forname : string,
    name : string,
    email : string,
    phone_number : number,
    zipcode : number,
    address : string,
    password : string,
    siret_number : string,
    compagny : string
}

export interface IPatchUser {
    forname : string
    name : string
    birth_date? : Date
    gender? : number
    email : string
    phone_number : string
    zipcode : number
    address : string
    siretNumber? : string,
    companyName? : string
}

export interface IUsername {
    id: number,
    name: string,
    forname: string
}

export interface IFile{
    name: string,
    link:File
}

