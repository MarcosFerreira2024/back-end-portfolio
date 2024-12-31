import { Prisma } from "@prisma/client";
import prisma from "../libs/prisma";
import { findAllService, findUniqueService } from "../services/modelFindService";
import { deleteService } from "../services/modelDeleteService";
import { handleCreateModel, handleUpdateModel } from "../services/handleModelsRequests";

export const getProjetosModel = async () => {
  try {
    const projetos = await findAllService({

      data:{
            id: true,

            titulo: true,

            descricao: true,

            skills: true,

            slug: true,

            liveUrl: true,

            githubUrl: true,

            photo: true,

            createdAt: true,

            updatedAt: true,
      },

      model:prisma.projetos
      
    })

    if(!projetos){
      throw new Error ("Dados inválidos")
    }
    return projetos;
    


    
  } 
  catch 
  {
    throw new Error();
  }
};


export const createProjetoModel = async (data: Prisma.ProjetosCreateInput) => {
  handleCreateModel({data,model:prisma.projetos,key:"projeto(s)"})

};

export const getProjetoModel = async (slug: string) => {
 
  try {

    const projeto = await findUniqueService({

      find:"slug",

      value:slug,

      data:{
        id:true,

        titulo:true,

        descricao:true,

        slug:true,

        skills:true,

        githubUrl:true,

        liveUrl:true,

        photo:true,

        skillsPath:true,

        createdAt:true,

        updatedAt:true,
      },

      model:prisma.projetos

    })

    if (!projeto){
      return null

    }

    return projeto

  } 
  catch {
    return null;

  }
};

export const updateProjetoModel = async (id:string,validateData:Prisma.ProjetosUpdateInput) =>{
  handleUpdateModel({id,model:prisma.projetos,validateData})

}



export const deleteProjetoModel = async (id:string) =>{
  try {
    const updated = await deleteService({
      find:"id",

      value:id,

     model:prisma.projetos,
   })
   if(!updated){
     return null

   }
   return updated
   
  }catch{
   throw new Error ("Erro INTERNO")
  }
}
