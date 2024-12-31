import prisma from "../libs/prisma"
import { CrudManyParams, CrudUniqueParams } from "./interfaces"

export const findUniqueService = async<T>({find,value,data,model}:CrudUniqueParams<T>) =>{

    try {
        const search = await model.findUnique({
            where:{
                [find]:value,
            },
            select:data
            
        })
        if(!search){
            return null

        }
        return search

    }
    catch { 
      return null

    }

}


export const findAllService = async<T>({data,model}:CrudManyParams<T>) =>{

    try {
        const search = await model.findMany({
            select:data
            
        })
        if(!search){
            return null

        }
        return search

    }
    catch { 
      return null

    }

}