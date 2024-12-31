import { Prisma } from "@prisma/client";
import prisma from "../libs/prisma";
import { findAllService, findUniqueService } from "../services/modelFindService";
import { updateService } from "../services/modelUpdateService";
import { deleteService } from "../services/modelDeleteService";
import { handleCreateModel } from "../services/handleModelsRequests";


export const getCertificadosModel = async () => {
  try {
    const certificados = await findAllService({
      data:{
        id: true,

        titulo: true,

        descricao: true,

        horas:true,

        slug: true,

        url: true,

        createdAt: true,

        updatedAt: true,
      },

      model:prisma.certficados

    })

    if(!certificados){
      throw new Error ("Dados inválidos")

    }
    return certificados;
    
  } 
  catch
  {
    throw new Error("Erro Interno");
  }
};

export const createCertificadoModel = async (data: Prisma.CertficadosCreateInput) => {
  handleCreateModel({data,model:prisma.certficados,key:"certificado(s)"})

};

export const getCertificadoModel = async (slug: string) => {
 
  try {

    const certificado = await findUniqueService({

      find:"slug",

      value:slug,

      data:{
        id:true,

        titulo:true,

        descricao:true,

        slug:true,

        horas:true,

        createdAt:true,

        updatedAt:true,
      },

      model:prisma.certficados

    })

    if (!certificado){
      return null

    }

    return certificado

  } 
  catch {
    return null;

  }
};



export const updateCertificadoModel = async (id:string,validateData:Prisma.CertficadosUpdateInput) =>{
   try {
     const updated = await updateService({
       find:"id",

       value:id,

      data:validateData,

      model:prisma.certficados,
    })
    if(!updated){
      return null

    }
    return updated

   }catch{
    throw new Error ("Erro INTERNO")
   }
}



export const deleteCertificadoModel = async (id:string) =>{
  try {
    const updated = await deleteService({
      find:"id",

      value:id,

      model:prisma.certficados,

   })
   if(!updated){
     return null

   }
   return updated
   
  }catch{
   throw new Error ("Erro INTERNO")
  }
}
