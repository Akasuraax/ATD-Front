export interface IAddType {
    name: string;
    description: string | null;
    color: string;
    display:boolean;
    type_image:File;
    access_to_warehouse:boolean;
    access_to_journey:boolean;
}

export interface IType{
    id:number;
    name:string;
    color: string;
    display:boolean;
    type_image:File;
    description: string | null;
    access_to_warehouse:boolean;
    access_to_journey:boolean;
    archive:boolean;
    created_at:Date;
}