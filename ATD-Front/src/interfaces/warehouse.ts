
export interface IWarehouse {
    id: number;
    name: string;
    address: string;
    zipcode: number;
    capacity: number;
    created_at: Date;
    updated_at: Date;
    archive: boolean;
}