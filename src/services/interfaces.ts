import { Response , Request } from "express"
import { schemaCertificados, schemaProjetos } from "./schema"

export type Key = "certificado(s)"|"projeto(s)"|"usuario(s)"

export interface CrudUniqueParams<T> extends CrudManyParams<T> {
    value:string
    
    find:"email"|"id"|"slug",

}


export interface CrudManyParams<T>  {
    data:T,

    model: any

}


export interface Delete {
    find:"email"|"id"|"slug",

    value:string,

    model:any

}



export interface InterfaceGetAll {
    model : () => Promise<any>,

    res : Response,

    key:Key

}
 

export interface InterfaceCreateOne {
    model:(data:any)=> Promise<any>,

    body:any,

    res:Response,
    
    key:Key

    schema: typeof schemaCertificados| typeof schemaProjetos

}

export interface CreateOneModel{
    data: any

    model: any
    
    key:Key

}


export interface InterfaceGetOne {
  slug:string,

  res:Response,

  model:(data:any)=> Promise<any>; 

  key:Key

}

export interface InterfaceDeleteOne {
    id:string,

    res:Response,

    key:Key,

    model:(data:any)=> Promise<any>

}

export interface InterfaceUpdateOne {
    id:string,

    body:any,

    key:Key,

    model:(id:string,data: any)=> Promise<any>

    schema:any,

    res:Response
    
}