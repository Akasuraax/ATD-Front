
export interface IAddAnnexe {
    name: string
    address: string
    zipcode: number
}

export interface IAnnexes{
    id : number
    name: string
    address: string
    zipcode: number
    archive: boolean
    created_at:Date;
}