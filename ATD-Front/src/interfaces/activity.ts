export interface IActivity{
    name:string,
    description:string,
    access_to_warehouse:boolean,
    access_to_journey:boolean
}

export class Activity implements IActivity{
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