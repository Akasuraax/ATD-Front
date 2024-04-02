export interface IProduct {
    id:number,
    name:string;
    measure:string,
    count:number,
    create_at:Date,
    update_at:Date,
}



export interface IAddProduct {
    name:string;
    measure:string,
}

export interface IActivityProduct {
    id:number,
    name:string;
    measure:string,
    count:number,
    max:number
}
