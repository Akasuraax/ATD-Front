export interface IProduct {
    id:number,
    name:string;
    measure:string,
    count:number,
    create_at:Date,
    update_at:Date,
    archive:boolean
}



export interface IAddProduct {
    name:string;
    measure:string,
}