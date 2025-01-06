import { CrudUniqueParams } from "../services/interfaces";

export const updateModel = async<T>({find,value,data,model}:CrudUniqueParams<T>) =>{
    try {
        const updated = await model.update({
                where:{
                    [find]:value
                    
                },
                data,
                
        })
        if (!updated){
             throw new Error ("Não foi possivel Atualizar")

        }
        return updated

    }catch (e){
        if (e instanceof Error && e.message.includes("not found")){
            throw new Error(`${find} não foi encontrado`)
        }
        return e 
        
    }
}