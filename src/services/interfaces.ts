import {  PrismaClient } from "@prisma/client"


export interface CrudUniqueParams<T> extends CrudManyParams<T> {
    value:string
    
    find:"email"|"id"|"slug",

}


export interface CrudManyParams<T>  {
    data:T,

    model:any

}


export interface Delete {
    find:"email"|"id"|"slug",

    value:string,

    model:any

}



export interface GetAll {
    model : () => Promise<any>,



}
 

export interface CreateOne {
    model:(data:any)=>Promise<any>,

    data:any,

    


}

export interface Model{
    data: any
    model:keyof PrismaClient

}



export interface GetOne {
  data:string,

  model:(data:any)=> Promise<any>; 


}

export interface DeleteOne {
    id:string,

    model:(data:any)=> Promise<any>

}

export interface UpdateOne {
    id:string,

    data:any,


    model:(id:string,data: any)=> Promise<any>


}