import { Prisma } from "@prisma/client";
import prisma from "../libs/prisma";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import * as JWT from "jsonwebtoken";
import { findUniqueService } from "../services/modelFindService";
import { handleUpdateModel, handleVerifyUser } from "../services/handleModelsRequests";
import { deleteService } from "../services/modelDeleteService";

dotenv.config();

export const registerModel = async (data: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.create({ data });
    return user;
  } catch (e) {
    return null
  }
};

export const loginModel = async (email: string, senha: string) => {
  try {
    
    const user = await findUniqueService({
      find:"email",
      value:email,
      data:{
        id:true,
        email:true,
        password:true
      },
      model:prisma.user
      
    });
    (user)
    if (user) {

      const validaSenha = await bcrypt.compare(senha, user.password);
      if (validaSenha) {

        const token = JWT.sign(
          { id: user.id, email: user.email },
          process.env.MY_SECRET_KEY as string
        );

        return {
          message: "Usuario logado",
          token,
        };
      }

    }
    throw new Error();

  } 
  catch (e)
   {
    ("Erro")
  }

};

export const getUserInfoModel = async (token: string,password:string) => {

  return handleVerifyUser(token,password)
};

export const getAllUsersModel = async () => {
  try {
    const users = await prisma.user.findMany({

      select: {
        name: true,
        id: true,
        createdAt: true,
        role: true,
        updatedAt: true,

      },
      
    });
    return users;
  } catch {
    return null;
  }
};



export const updateUserModel = async (token:string,data:Prisma.UserUpdateInput) =>{
    const user = await handleVerifyUser(token,data.password as string)

    const {password,role,...newData} = data
  if (user){
    const updatedUser = await handleUpdateModel({id:user.id,model:prisma.user,validateData:newData })
    const token = JWT.sign(
      { id: user.id, email: newData.email },
      process.env.MY_SECRET_KEY as string
    );
    return {updatedUser,token}
  }
  return

}

export const deleteUserModel = async (token:string,password:string) =>{
  const user = await handleVerifyUser(token,password )

  if(user){
    const deleted = await deleteService({find:"id",model:prisma.user,value:user.id})
    if (deleted){
      return deleted
    }
    return null
  }
  return null
}