import { CreateOne, DeleteOne, GetAll, GetOne, UpdateOne, } from "./interfaces";

export const handleGetAll = async({model}:GetAll) =>{
  try {

    const data = await model()

    if(!data){
      
       throw new Error("Nenhum dado encontrado")
    }
    return data
  }catch (e){
    return e

  }

}



export const handleCreateOne = async ({model,data}:CreateOne) =>{

  try {

    const created = await model(data);

    if(created instanceof Error){
      throw new Error (created.message)
    }


    return created

  } catch (e) {

    return e
  }
};


export const handleGetOne = async ({model,data}:GetOne)=>{

  try {

    const dataSlug = await model(data);

    if (dataSlug){
      
      return dataSlug
    }
     throw new Error("Slug Invalido")

  } catch (e){

    return e 
  }
}

export const handleDeleteOne = async ({model,id}:DeleteOne) =>{
  if (!id) {
     throw new Error("Id inválido")
 
   };
   try {
     const deletedData = await model(id);
 
       if(deletedData){
         
         return deletedData
       }
        throw new Error("Não encontrado")
 
     } catch(e){
       return e
     }
}


export const handleUpdateOne= async ({id,model,data}:UpdateOne) =>{

  try {
    const updated = await model(id,data as any);
    if(!updated){

       throw new Error ("Usuário não encontrado")
    }
      return updated;

    } catch (e) {
      return e 
    }

}