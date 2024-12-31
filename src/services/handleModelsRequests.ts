import prisma from "../libs/prisma";
import { CreateOneModel } from "./interfaces";
import { findUniqueService } from "./modelFindService";
import { updateService } from "./modelUpdateService";
import JWT  from "jsonwebtoken";
import bcrypt from "bcrypt"

export const handleCreateModel = async({data,model,key}:CreateOneModel)=>{
    try {
  
    
      const created = await model.create({ data });
  
  
  
      return created;
  
  
    } catch {
  
  
  
      throw new Error(`${key} já existe `);
  
      
    }
  }

 type updateModel = {
  id:string,
  validateData:any
  model:any
 }
  export const handleUpdateModel = async ({id,validateData,model}:updateModel)=>{
    try {
      const updated = await updateService({
        find:"id",
        value:id,
       data:validateData,
       model,
     })
     if(!updated){
       return null
     }
     return updated
    }catch{
     throw new Error ("Erro INTERNO")
    }
  }


  export const handleVerifyUser = async (token:string,password:string) =>{
    try {
      const jwtToken =JWT.verify(token,process.env.MY_SECRET_KEY as string) 
      const decoded = jwtToken as {email: string}
      if(decoded){
        const user = await findUniqueService({
          find:"email",
          value:decoded.email,
          model:prisma.user,
          data:{
            id:true,
            name:true,
            role:true,
            password:true,
          },
          
        })
        const comparedPassword = await bcrypt.compare(password as string,user.password as string)
        if (!comparedPassword){
          
          return null
        }
        return user
      }
      return null
    }catch{
      return "Usuario nao existe"
    }

  }






 