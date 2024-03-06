import {IAnnexe} from "./annexe";

export interface IVehicles {
    id:number;
    name:string;
    license_plate:string;
    average_consumption:number;
    fuel_type:string;
    annexe: IAnnexe;
    archive:boolean;
    created_at:Date;
}