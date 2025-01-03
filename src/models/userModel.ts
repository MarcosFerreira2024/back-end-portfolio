import { Prisma } from "@prisma/client";
import prisma from "../libs/prisma";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import * as JWT from "jsonwebtoken";
import { findUniqueService } from "./findModel";
import { deleteService } from "./deleteModel";
import { updateService } from "./updateModel";

dotenv.config();

export const registerModel = async (data: Prisma.UserCreateInput) => {
  try {
    const user = await prisma.user.create({ data });
    if(!user){
      throw new Error ("Dados inválidos")
    }
    return user

  } 
  catch (error) 
  {
    if (error instanceof Error && error.message.includes("email")) {
      return new Error("Email já cadastrado");
    }
  }

};

export const loginModel = async (email: string, senha: string) => {
  try {
    const findedUser = await findUniqueService({
      find:"email",

      value:email,

      data:{
        id:true,

        email:true,

        password:true
      },

      model:prisma.user
      
    });

    if(findedUser instanceof Error) {
       throw new Error (findedUser.message)

    }

    const validaSenha = await bcrypt.compare(senha, findedUser.password);

    if (validaSenha) {

      const token = JWT.sign(
        { id: findedUser.id, email: findedUser.email },
        process.env.MY_SECRET_KEY as string
      );

      return {
        message: "Usuario logado",
        token,
      };
    }

     throw new Error("Senha Incorreta") 

  }
  catch (e)
   {
    return e
  }

};

export const getUserInfoModel = async (token: string,password:string) => {

  try {
    const verifiedUser = await VerifyUser(token,password)

    if (verifiedUser instanceof Error){
       throw new Error (verifiedUser.message)

    }
    return verifiedUser
      
  }
  catch(e){
    return e

  }
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
    if (!users){
       throw new Error ("Nenhum usuário encontrado")

    }
    return users;

  } 
  catch (e){
    return e ;

  }
};



export const updateUserModel = async (token:string,data:Prisma.UserUpdateInput) =>{
  try {
    const user = await VerifyUser(token,data.password as string)

    const {password,role,...newData} = data

  if (user instanceof Error){
       throw new Error (user.message)

    }
    const updatedUser = await updateService({find:"id",model:prisma.user,value:user.id,data:newData })

    if(updatedUser instanceof Error){
       throw new Error(updatedUser.message)
    }
    const newToken = JWT.sign(
      { id: user.id, email: newData.email },
      process.env.MY_SECRET_KEY as string
    );
    return {updatedUser,newToken}

  }
  catch(e){
    if (e instanceof Error && e.message.includes("data")) {
      return new Error("Token Invalido");
    }
    return e

  }

}
  
export const VerifyUser = async (token:string,password:string) =>{
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
         throw new Error ("Senha Incorreta")

      }
      return user

    }
     throw new Error ("Token Inválido")

  }
  catch(e){
    return e

  }

}

export const deleteUserModel = async (token:string,password:string) =>{
  try {
    const user = await VerifyUser(token,password )

    if(user instanceof Error){
       throw new Error(user.message)
 
    }
    const deleted = await deleteService({find:"id",model:prisma.user,value:user.id})
      
    if (deleted){
      return deleted

    }
     throw new Error("Usuário não foi Encontrado")

  }
  catch(e){
    if (e instanceof Error && e.message.includes("data")) {
      return new Error("Usuário não encontrado");
  }
  return e
}
}