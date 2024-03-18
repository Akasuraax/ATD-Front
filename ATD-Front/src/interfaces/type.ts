export interface IType{
    id: number,
    name: string,
    description?: string,
    image?: string,
    display: boolean,
    access_to_warehouse: boolean,
    access_to_journey: boolean,
    archive: boolean,
    created_at: string;
    updated_at: string;
}
