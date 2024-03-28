import {IWarehouse} from "./warehouse";
import {IProduct} from "./product";

export interface IAddPiece{
    id_product: number;
    id_warehouse: number;
    location: number | null;
    count: number;
    expired_date: Date | null;
}

export interface IPiece{
    id: number;
    product: IProduct;
    warehouse: IWarehouse;
    count: number;
    expired_date: Date;
    archive:boolean;
    created_at:Date;
}