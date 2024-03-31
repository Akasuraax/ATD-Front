import {ICreatActivityRole, IRole} from './role'
import {IActivityRecipe, IRecipe} from "./recipe";

export interface IActivity2{
    name:string,
    description:string,
    access_to_warehouse:boolean,
    access_to_journey:boolean
}

export interface IActivity {
    id: number,
    title: string,
    description: string,
    address: string,
    zipcode: number,
    start_date: Date,
    end_date: Date,
    donation: boolean,
    type_name: string,
    roles:IRole[],
}

export interface IAddActivity {
    title: string,
    description: string,
    address: string,
    zipcode: number,
    start_date: Date,
    end_date: Date,
    donation: number,
    type: string,
    public:boolean
    roles:ICreatActivityRole[],
    files:File[]
    recipes:IActivityRecipe[]
}
export class Activity implements IActivity2{
    name:string
    description:string
    access_to_warehouse:boolean
    access_to_journey:boolean

    constructor(name:string, description:string, access_to_warehouse:boolean, access_to_journey:boolean) {
        this.name = name;
        this.description = description;
        this.access_to_warehouse = access_to_warehouse;
        this.access_to_journey = access_to_journey;
    }

}