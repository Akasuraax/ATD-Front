export interface IUser {
    id: number;
    name: string;
    forname: string;
    phone_country?: string;
    phone_number?: string;
    address: string;
    zipCode: string;
    password: string;
    email: string;
    birth_date: Date;
    gender: number;
    companyName?: string;
    siret?: string;
    updated_at: string;
    created_at: string;
    roles: IRole[];
}

export interface IRole {
    id: number;
    name: string;
    archive: boolean;
    created_at: string;
    updated_at: string;
}