export interface IUser {
    id: number;
    name: string;
    forname: string;
    phone_country?: string;
    phone_number?: string;
    address: string;
    zipcode: string;
    password: string;
    email: string;
    birth_date: Date;
    gender: number;
    compagny?: string;
    siret_number?: string;
    updated_at: string;
    created_at: string;
    roles: IRole[];
    ban:boolean;
    archive:boolean;
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
    birth_date : Date,
    gender : number,
    email : string,
    phone_number : number,
    zipcode : number,
    address : string,
    password : string,
    siret_number : string,
    compagny : string
}