export interface IType{
    id: number,
    name: string,
    description?: string,
    access_to_warehouse: boolean,
    access_to_journey: boolean,
    archive: boolean
}
