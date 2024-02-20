export interface IUser {
    name: string;
    firstName: string;
    phoneNumber?: string;
    address: string;
    zipCode: string;
    password: string;
    email: string;
    birthdayDate: Date;
    sex: string;
    companyName?: string;
    siret?: string;
}