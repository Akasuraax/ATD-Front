import {IProduct} from "./product";

export interface IRecipe {
    id:number,
    name:string,
    description:string,
    archive:boolean,
    create_at:Date,
    update_at:Date
    products: IProduct[]
}

export interface IAddRecipe {
    name:string,
    description:string,
    products:IProduct[]
}

export interface IActivityRecipe {
    name:string,
    id:number
    count:number
    products:IProduct[]
}