export interface IUser {
    name: string;
    firstName: string;
    phoneNumber: string;
    address: string;
    zipCode: string;
    password: string;
    email?: string;
}

export interface IBeneficiary extends IUser {
    birthdayDate: Date;
    sex: string;
}

export interface IPartner extends IUser {
    companyName: string;
    siret: number;
}

export interface IVolunteer extends IUser {
    companyName: string;
    siret: number;
}

export class User implements IUser {
    name: string;
    firstName: string;
    phoneNumber: string;
    address: string;
    zipCode: string;
    password: string;
    email?: string;

    constructor(name: string, firstName: string, phoneNumber: string, address: string, zipCode: string, password: string, email: string) {
        this.name = name;
        this.firstName = firstName;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.zipCode = zipCode;
        this.password = password;
        this.email = email;
    }
}

export class Beneficiary extends User implements IBeneficiary {
    birthdayDate: Date;
    sex: string;

    constructor(name: string, firstName: string, phoneNumber: string, address: string, zipCode: string, password: string, email: string, birthdayDate: Date, sex: string) {
        super(name, firstName, phoneNumber, address, zipCode, password, email);
        this.birthdayDate = birthdayDate;
        this.sex = sex;
    }
}
