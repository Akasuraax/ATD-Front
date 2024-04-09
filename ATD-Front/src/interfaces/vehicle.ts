import {IAnnexe} from "./annexe";

export interface IVehicles {
    id:number;
    name:string;
    license_plate:string;
    average_consumption:number;
    fuel_type:string;
    partner:boolean;
    annexe: IAnnexe;
    archive:boolean;
    created_at:Date;
}

export interface IAddVehicle{
    name: string,
    license_plate: string,
    average_consumption: number,
    partner:boolean;
    fuel_type: string,
    id_annexe: number
}