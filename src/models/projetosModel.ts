import { Prisma } from "@prisma/client";
import prisma from "../libs/prisma";
import { findAllService, findUniqueService } from "./findModel";
import { updateService } from "./updateModel";
import { deleteService } from "./deleteModel";



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

    if(projetos instanceof Error){
       throw new Error (projetos.message)
    }
      return projetos;
      
    
  } 
  catch(e)
  {
    return e;
  }
};

export const createProjetoModel = async (data: Prisma.ProjetosCreateInput) => {
  try {
    const projeto = await prisma.projetos.create({data})
    if (!projeto){
       throw new Error ("Dados Inválidos")

    }
    return projeto

  }catch(e){
    if (e instanceof Error && e.message.includes("slug")) {
      return new Error("Slug já cadastrado");
    }
    return e
  }

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

    if (projeto instanceof Error){
      
       throw new Error(projeto.message)

    }

    return projeto

  } 
  catch (e){
    return e;

  }
};



export const updateProjetoModel = async (id:string,validateData:Prisma.ProjetosUpdateInput) =>{
   try {
     const updated = await updateService({
       find:"id",

       value:id,

      data:validateData,

      model:prisma.projetos,
    })
    if(updated instanceof Error){
       throw new Error (updated.message)

    }
    return updated

   }catch(e){
      return e
    
   }
}



export const deleteProjetoModel = async (id:string) =>{
  try {
    const updated = await deleteService({
      find:"id",

      value:id,

      model:prisma.projetos,

   })
   if(updated instanceof Error){
      throw new Error (updated.message)

   }
   return updated
   
  }catch(e){
   return e
   
  }
}
