import { RequestHandler } from "express";
import { createCertificadoModel, deleteCertificadoModel, getCertificadoModel, getCertificadosModel, updateCertificadoModel } from "../models/certificadosModel";
import { schemaCertificados } from "../services/schema";
import { handleCreateOne, handleDeleteOne, handleGetAll, handleGetOne, handleUpdateOne} from "../services/controllerRequests";
import HTTP_STATUS from "../consts/httpStatus";

export const getCertificados: RequestHandler = async (req, res) => {

  try {
    const certificados = await handleGetAll({model:getCertificadosModel})
    if(certificados instanceof Error){
      res.status(HTTP_STATUS.BAD_GATEWAY).json({
        message: certificados.message
      })
      return
    }
    res.status(HTTP_STATUS.OK).json(
      certificados
    )
    return
  }catch {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Erro Interno"
    })
    return
  }

};

export const createCertificado:RequestHandler = async (req,res)=>{
  try {

    const validate= schemaCertificados.safeParse(req.body)
    if (!validate.success){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: validate.error.flatten().fieldErrors
      })
      return
    }
    const certificados = await handleCreateOne({model:createCertificadoModel,data:validate.data})
    if(certificados instanceof Error){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: certificados.message
      })
      return
    }
    res.status(HTTP_STATUS.OK).json({
      certificados
    })
    return
  }catch {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Erro Interno"
    })
    return
  }

};

export const getCertificado:RequestHandler = async (req,res)=>{
  try {
    const slug = req.params.slug
    if(!slug){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: "Slug Obrigátorio"
      })
      return
    }
    const certificados = await handleGetOne({model:getCertificadoModel,data:slug})
    if(certificados instanceof Error){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: certificados.message
      })
      return
    }
    res.status(HTTP_STATUS.OK).json({
      certificados
    })
    return
  }catch {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Erro Interno"
    })
    return
  }

};

export const updateCertificado:RequestHandler = async (req,res)=>{
  try {
    const id = req.body.id
    const validate = schemaCertificados.partial().safeParse(req.body)
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
    const certificados = await handleUpdateOne({data:validate.data,id,model:updateCertificadoModel})
    if(certificados instanceof Error){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: certificados.message
      })
      return
    }
    res.status(HTTP_STATUS.OK).json({
      certificados
    })
    return
  }catch {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Erro Interno"
    })
    return
  }

};


export const deleteCertificado:RequestHandler = async (req,res)=>{
  try {
    const id = req.body.id
    if(!id){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message:"Id Inválido"
      })
      return
    }
    const certificados = await handleDeleteOne({model:deleteCertificadoModel,id})
    if(certificados instanceof Error){
      res.status(HTTP_STATUS.BAD_REQUEST).json({
        message: certificados.message

      })
      return
    }
    res.status(HTTP_STATUS.OK).json({
      certificados
    })
    return
  }catch {
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
      message: "Erro Interno"
    })
    return
  }

};
