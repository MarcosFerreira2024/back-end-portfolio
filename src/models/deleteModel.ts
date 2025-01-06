import { Delete } from "../services/interfaces"

export const deleteModel= async ({find,value,model}:Delete)=>{
    try {
        const deleted = await model.delete({
            where:{
                [find]:value
                
            },

        })
        if(!deleted){
             throw new Error("Não foi possivel deletar")

        }
        return deleted

    }catch(e){
        if(e instanceof Error && e.message.includes("data")){
            throw new Error("Não Encontrado")
        }
        
    }
}