export interface IDemand{
    id : number
    description: string
    status: number
    id_user: number
    id_type: number
    archive: boolean
    created_at:Date
}

export interface IDemandPost{
    description: string
    id_type: number
}