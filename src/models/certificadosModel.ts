import { Prisma } from "@prisma/client";
import prisma from "../libs/prisma";
import { findAllService, findUniqueService } from "./findModel";
import { updateService } from "./updateModel";
import { deleteService } from "./deleteModel";



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

      
    if(certificados instanceof Error){
       throw new Error (certificados.message)
    }
    return certificados;

    
  } 
  catch(e)
  {
    return e;
  }
};

export const createCertificadoModel = async (data: Prisma.CertficadosCreateInput) => {
  try {
    const certificado = await prisma.certficados.create({data})
    if (!certificado){
       throw new Error ("Dados Inválidos")

    }
    return certificado

  }catch(e){
    if (e instanceof Error && e.message.includes("slug")) {
      return new Error("Slug já cadastrado");
    }
    return e
  }

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

    if (certificado instanceof Error){
      
       throw new Error(certificado.message)

    }

    return certificado

  } 
  catch (e){
    return e;

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
    if(updated instanceof Error){
       throw new Error (updated.message)

    }
    return updated

   }catch(e){
      return e
    
   }
}



export const deleteCertificadoModel = async (id:string) =>{
  try {
    const updated = await deleteService({
      find:"id",

      value:id,

      model:prisma.certficados,

   })
   if(updated instanceof Error){
      throw new Error (updated.message)

   }
   return updated
   
  }catch(e){
   return e
   
  }
}
