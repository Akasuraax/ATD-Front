export interface IAddType {
    name: string;
    description: string;
    display:boolean;
    type_image:File;
    access_to_warehouse:boolean;
    access_to_journey:boolean;
}

export interface IType{
    id:number;
    name:string;
    display:boolean;
    type_image:File;
    description: string;
    access_to_warehouse:boolean;
    access_to_journey:boolean;
    archive:boolean;
    created_at:Date;
}