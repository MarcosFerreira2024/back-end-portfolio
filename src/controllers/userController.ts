import { Request, RequestHandler, Response } from "express";
import {
  registerModel,
  getAllUsersModel,
  getUserInfoModel,
  loginModel,
  updateUserModel,
  deleteUserModel,
} from "../models/userModel";
import bcrypt from "bcrypt";
import { schemaUserSignIn, schemaUserLogin } from "../services/schema";
import { getToken } from "../services/token";
import HTTP_STATUS from "../consts/httpStatus";

export const registerUser = async (req: Request, res: Response) => {
  
  req.body.role = "USER"; //seta a role como user caso alguem mal intencionado tente mudar a role na requisição

  const parsedData = schemaUserSignIn.safeParse(req.body);

  try {
    if (!parsedData.success) {
      //Se acontecer algum erro a função irá retornar um erro explicando o que aconteceu
      res
        .status(HTTP_STATUS.BAD_REQUEST)
        .json({ message: parsedData.error.flatten().fieldErrors });
      return;
    }
    //criptografia das senhas
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(parsedData.data.password, salt);

    const user = await registerModel({
      //usando a função createUserModel para criar um novo usuario
      name: parsedData.data.name,

      email: parsedData.data.email,

      password: hashedPassword,

    });
    if(user instanceof Error){
      res.status(HTTP_STATUS.BAD_REQUEST).json({ message: user.message });
      return
    }
    res.status(HTTP_STATUS.OK).json({
      user
    })
    return

  } catch {

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  // pega um usuário especifico e salva seu token
  try {
    const data = schemaUserLogin.safeParse(req.body);

    if (data.success) {
      const userToken = await loginModel(data.data.email, data.data.password); //retorna o token do usuário

      if(userToken instanceof Error){
        res.status(HTTP_STATUS.BAD_REQUEST).json(userToken.message);

      return;
      }
      res.status(HTTP_STATUS.OK).json(userToken);

      return;
    }
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: data.error.flatten().fieldErrors });

  } catch (e) {

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({ message: "Erro interno" });

  }
};

export const getUserInfo = async (req: Request, res: Response) => {
  if(req.headers.authorization && req.body.password){

    try {
      const token = await getToken(req.headers.authorization) as string

      if(!token){
         throw new Error ("Token Inválido")
      }
      
      const user = await getUserInfoModel(token,req.body.password)

      if(user instanceof Error){

        res.status(HTTP_STATUS.BAD_REQUEST).json({
          message:user.message
      
        })
        return
      }
    
      res.status(HTTP_STATUS.OK).json({
        user
      })

      return
      }
    
      catch(e){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: e
      })
      }
  }
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message:"Dados Inválidos"
      })
      return
}

export const getAllUsers = async (req: Request, res: Response) => {

  try {

    const users = await getAllUsersModel();

    if(users instanceof Error){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message:users.message
      })
    }
    res.status(HTTP_STATUS.OK).json({
      users,
    });

  } catch {

    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "ERRO INTERNO",
    });

  }
};

export const updateUser:RequestHandler = async (req,res) => {
  try {

    if(req.headers.authorization && req.body.password){

      const token = await getToken(req.headers.authorization)

      if(token){

        const updated = await updateUserModel(token,req.body)
        if(updated instanceof Error){
          res.status(HTTP_STATUS.BAD_REQUEST).json({
            message:updated.message
          })
          return
        }

        res.status(HTTP_STATUS.OK).json({
          message:updated
        })
        return

      }
      
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message:"Token Expirado ou inválido"
      })
      return
    }
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:"Senha necessária"
    })
    return
    
  }catch(e){
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Erro Interno"
    })
    return

  }
};



export const deleteUser:RequestHandler = async (req,res) => {
  (req.body)

  try {
    if(req.headers.authorization && req.body.password){

      const token = await getToken(req.headers.authorization)

      if(token){

        const deleted = await deleteUserModel(token,req.body.password)

        if(deleted instanceof Error){

          res.status(HTTP_STATUS.BAD_REQUEST).json({
            message:deleted.message
          })

          return
        }
        res.status(HTTP_STATUS.OK).json({
          deleted
        })
        return
      }
      
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message:"Token Expirado ou inválido"
      })
      return
    }
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:"Insira sua senha"
    })
    return
  }catch{
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message:"Erro Interno"
    })
  }
};