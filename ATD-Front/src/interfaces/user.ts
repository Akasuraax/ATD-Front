export interface IUser {
    name: string;
    firstName: string;
    phone_country?: string;
    phone_number?: string;
    address: string;
    zipCode: string;
    password: string;
    email: string;
    birthdayDate: Date;
    sex: string;
    companyName?: string;
    siret?: string;
}

export interface IRole {
    id: number,
    name: string,
    archive: boolean,
    created_at: string,
    updated_at: string,
}