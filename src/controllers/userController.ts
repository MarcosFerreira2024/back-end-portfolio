import z from "zod";
import { HTTP_STATUS } from "../services/httpStatus";
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
import { schemaUser } from "../services/schema";
import { getToken } from "../services/handleToken";

export const registerUser = async (req: Request, res: Response) => {
  
  req.body.role = "USER"; //seta a role como user caso alguem mal intencionado tente mudar a role na requisição

  const parsedData = schemaUser.safeParse(req.body);

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
    res.status(HTTP_STATUS.CREATED).json(user);

  } catch (e) {

    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Usuario já existe" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  // pega um usuário especifico e salva seu token
  const schema = z.object({

    email: z.string().email({ message: "Email inválido" }), //schema zod validação de dados

    password: z.string().min(6, "A senha deve ter no minimo 6 caracteres"),

  });
  try {
    const data = schema.safeParse(req.body);

    if (data.success) {
      const userToken = await loginModel(data.data.email, data.data.password); //retorna o token do usuário

      res.status(HTTP_STATUS.OK).json(userToken);

      return;
    }
    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: data.error.flatten().fieldErrors });

  } catch (e) {

    res.status(HTTP_STATUS.BAD_REQUEST).json({ message: "Usuário não EXISTE" });

  }
};

export const getUserInfo = async (req: Request, res: Response) => {
  if(req.headers.authorization && req.body){

    const token = await getToken(req.headers.authorization) as string

    const user = await getUserInfoModel(token,req.body.password)

    if (user){

      res.status(HTTP_STATUS.OK).json({
        user
      })

      return
    }
  }

  res.status(HTTP_STATUS.BAD_REQUEST).json({
    message:'Senha Incorreta'

  })
  return
};

export const getAllUsers = async (req: Request, res: Response) => {

  try {

    const users = await getAllUsersModel();

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

        res.status(HTTP_STATUS.OK).json({
          updated
        })

      }
      
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message:"Token Expirado ou inválido"
      })
      return
    }
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:"Dados Inválidos"
    })
    return
    
  }catch(e){
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message:"Erro Interno"
    })

  }
};



export const deleteUser:RequestHandler = async (req,res) => {
  (req.body)

  try {
    if(req.headers.authorization && req.body.password){

      const token = await getToken(req.headers.authorization)

      if(token){

        const deleted = await deleteUserModel(token,req.body.password)

        if(!deleted){

          res.status(HTTP_STATUS.BAD_REQUEST).json({
            message:"Usuário já foi excluido"
          })

          return
        }
        res.status(HTTP_STATUS.OK).json({
          deleted
        })
      }
      
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message:"Token Expirado ou inválido"
      })
      return
    }
    res.status(HTTP_STATUS.BAD_REQUEST).json({
      message:"Dados Inválidos"
    })
    return
  }catch{
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message:"Erro Interno"
    })
  }
};