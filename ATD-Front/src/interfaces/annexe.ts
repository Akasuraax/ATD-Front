
export interface IAddAnnexe {
    name: string
    address: string
    zipcode: string
}

export interface IAnnexes{
    id : number
    name: string
    address: string
    zipcode: string
    archive: boolean
    created_at:Date;
}