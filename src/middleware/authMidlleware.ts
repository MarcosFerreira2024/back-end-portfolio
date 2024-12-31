import { RequestHandler } from "express";
import { HTTP_STATUS } from "../services/httpStatus";
import prisma from "../libs/prisma";
import { verifyToken } from "../services/handleToken";
import { findUniqueService } from "../services/modelFindService";


export const middlewareAuth: RequestHandler = async (req,res,next) => {
  if (!req.headers.authorization) {
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: "Você não está logado" });

    return;
  }
  try {
    const email = await verifyToken(req.headers.authorization.split(" ")[1]);

    if (!email) {
      res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Token invalido" });

      return;

    }

    next();

    return;

  } catch {
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR)
      .json({ message: "Erro interno" });

  }
};

export const middlewareAdmin: RequestHandler = async (req, res, next) => {

  if (!req.headers.authorization) {
    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: "Você não está logado" });

    return;

  }

  try {
    const email = await verifyToken(req.headers.authorization.split(" ")[1]);

    if (!email) {
      res
        .status(HTTP_STATUS.UNAUTHORIZED)
        .json({ message: "Token invalido ou expirado" });

      return;

    }
    const user = await findUniqueService({
      find:"email",

      value:email,

      data:{
        role:true
      },

      model:prisma.user

    })

    if (!user || user.role !== "ADMIN") {// verifica se o usuario é admin ou se ele nao existe e esta tentando acessar a rota
      res
        .status(HTTP_STATUS.FORBIDDEN)
        .json({ message: "Você não tem permissão para acessar essa rota" });
      return;
    }

    next();

    return;

  } catch (e) {

    res
      .status(HTTP_STATUS.UNAUTHORIZED)
      .json({ message: "Token invalido ou expirado" });

  }
};
