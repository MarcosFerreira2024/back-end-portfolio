import prisma from "../libs/prisma";
import { CrudUniqueParams, } from "./interfaces";

export const updateService = async<T>({find,value,data,model}:CrudUniqueParams<T>) =>{
    try {
        const updated = await model.update({
                where:{
                    [find]:value
                    
                },
                data,
                
        })
        if (!updated){
            return undefined

        }
        return updated

    }catch{
        return undefined
        
    }
}