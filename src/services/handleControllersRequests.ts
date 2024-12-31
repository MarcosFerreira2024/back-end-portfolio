import { InterfaceCreateOne, InterfaceDeleteOne, InterfaceGetAll, InterfaceGetOne, InterfaceUpdateOne, } from "./interfaces";
import { HTTP_STATUS } from "./httpStatus";
import { z } from "zod";

export const handleGetAll = async({model,res,key}:InterfaceGetAll) =>{
  try {

    const data = await model()

    if(!data){
      
      res.status(HTTP_STATUS.NOT_FOUND).json({
        message:"Dados Não Encontrados"

      })
    }
    res.status(HTTP_STATUS.OK).json({
      [key]:data

    })
  }catch (e) {

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message:"erro interno"
    })

  }

}



export const handleCreateOne = async ({model,body,res,key,schema}:InterfaceCreateOne) =>{
  const validationData = schema.safeParse(body)

  if (!validationData.success) {

    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: validationData.error.flatten().fieldErrors,
    });

    return;
  }
  try {

    const data = await model(validationData.data);

    res.status(HTTP_STATUS.CREATED).json({
      [key]:data,
    });

  } catch (e) {

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Erro interno",
    });

  }
};


export const handleGetOne= async ({model,slug,res,key}:InterfaceGetOne)=>{
  const schema = z.string().min(4);

  try {
    const validationData = schema.safeParse(slug);

    if (!validationData.success) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: validationData.error.flatten().fieldErrors,
      });

      return;
    }
    const dataSlug = await model(validationData.data);

    if (dataSlug){
      res.status(HTTP_STATUS.OK).json({
        [key]:dataSlug,
      });
      
      return
    }
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:"Dados Invalidos"
    })

  } catch {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Erro Interno",
    });

    return
  }
}

export const handleDeleteOne = async ({model,id,res,key}:InterfaceDeleteOne) =>{
  if (!id) {
    res.status(HTTP_STATUS.BAD_REQUEST).json({
     message: "Dados inválidos"
    })
    return
 
   };
   try {
     const deletedData = await model(id);
 
       if(deletedData){
         res.status(HTTP_STATUS.OK).json({
           [key]:deletedData,
         });
         return deletedData
       }
       throw new Error()
 
     } catch (e) {
       res.status(HTTP_STATUS.BAD_REQUEST).json({
         message: `${key} não encontrado`,
       });
     }
}


export const handleUpdateOne= async ({schema,id,model,res,body,key}:InterfaceUpdateOne) =>{
  const validateData = schema.partial().safeParse(body);


  if (!validateData.success ) {
   res.status(HTTP_STATUS.BAD_REQUEST).json({
    message: "Dados inválidos"
   })
   return

  };
  if(!id || id.length !==24){
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:"Id inválido"
    })
    return
  }   
  try {
    const updated = await model(id,validateData.data as any);
    if(!updated){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message:"Usuário nao encontrado"
      })
      return
    }

      res.status(HTTP_STATUS.OK).json({
        [key]:updated,
      });

      return;

    } catch (e) {
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Dados Inválidos",
      });
    }

}