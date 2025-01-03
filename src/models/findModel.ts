import { CrudManyParams, CrudUniqueParams } from "../services/interfaces"

export const findUniqueService = async<T>({find,value,data,model}:CrudUniqueParams<T>) =>{

    try {
        const search = await model.findUnique({
            where:{
                [find]:value,
            },
            select:data
            
        })
        if(!search){
             throw new Error ("Não foi Encontrado")

        }
        return search

    }
    catch (e) { 
      return e

    }

}


export const findAllService = async<T>({data,model}:CrudManyParams<T>) =>{

    try {
        const search = await model.findMany({
            select:data
            
        })
        if(!search){
             throw new Error("Erro ao buscar")

        }
        return search

    }
    catch(e) { 
      return e

    }

}