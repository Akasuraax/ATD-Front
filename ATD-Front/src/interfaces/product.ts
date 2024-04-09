export interface IProduct {
    id:number,
    name:string;
    measure:string,
    created_at:Date,
    updated_at:Date,
    archive:boolean
}



export interface IAddProduct {
    name:string;
    measure:string,
}

export interface IActivityProduct {
    id:number,
    name:string;
    measure:string,
    max:number
}
