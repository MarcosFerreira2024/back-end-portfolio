import {  Delete } from "./interfaces";

export const deleteService= async ({find,value,model}:Delete)=>{
    try {
        const deleted = await model.delete({
            where:{
                [find]:value
                
            },

        })
        if(!deleted){
            return null

        }
        return deleted

    }catch{
        return null
        
    }
}