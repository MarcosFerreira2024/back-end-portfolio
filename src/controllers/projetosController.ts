import { RequestHandler } from "express";
import { HTTP_STATUS } from "../consts/httpStatus";
import { schemaProjetos } from "../services/schema";
import { handleCreateOne, handleDeleteOne, handleGetAll, handleGetOne, handleUpdateOne} from "../services/controllerRequests";
import { createProjetoModel, deleteProjetoModel, getProjetoModel, getProjetosModel, updateProjetoModel } from "../models/projetosModel";


export const getProjetos: RequestHandler = async (req, res) => {

  try {
    const projetos = await handleGetAll({model:getProjetosModel})
    if(projetos instanceof Error){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: projetos.message
      })
      return
    }
    res.status(HTTP_STATUS.OK).json({
      projetos
    })
    return
  }catch {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Erro Interno"
    })
    return
  }

};

export const createProjeto:RequestHandler = async (req,res)=>{
  try {

    const validate= schemaProjetos.safeParse(req.body)
    if (!validate.success){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: validate.error.flatten().fieldErrors
      })
      return
    }
    const projetos = await handleCreateOne({model:createProjetoModel,data:validate.data})
    if(projetos instanceof Error){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: projetos.message
      })
      return
    }
    res.status(HTTP_STATUS.OK).json({
      projetos
    })
    return
  }catch {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Erro Interno"
    })
    return
  }

};

export const getProjeto:RequestHandler = async (req,res)=>{
  try {
    const slug = req.params.slug
    if(!slug){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Slug Obrigátorio"
      })
      return
    }
    const projetos = await handleGetOne({model:getProjetoModel,data:slug})
    if(projetos instanceof Error){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: projetos.message
      })
      return
    }
    res.status(HTTP_STATUS.OK).json({
      projetos
    })
    return
  }catch {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Erro Interno"
    })
    return
  }

};

export const updateProjeto:RequestHandler = async (req,res)=>{
  try {
    const id = req.body.id
    const validate = schemaProjetos.partial().safeParse(req.body)
    if(!validate.success){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: validate.error.flatten().fieldErrors
      })
      return
    }
    if(!id){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Id Obrigátorio"
      })
      return
    }
    const projetos = await handleUpdateOne({data:validate.data,id,model:updateProjetoModel})
    if(projetos instanceof Error){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: projetos.message
      })
      return
    }
    res.status(HTTP_STATUS.OK).json({
      projetos
    })
    return
  }catch {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Erro Interno"
    })
    return
  }

};


export const deleteProjeto:RequestHandler = async (req,res)=>{
  try {
    const id = req.body.id
    if(!id){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message:"Id Inválido"
      })
      return
    }
    const projetos = await handleDeleteOne({model:deleteProjetoModel,id})
    if(projetos instanceof Error){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: projetos.message

      })
      return
    }
    res.status(HTTP_STATUS.OK).json({
      projetos
    })
    return
  }catch {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Erro Interno"
    })
    return
  }

};
