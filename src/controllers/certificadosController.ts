import { RequestHandler } from "express";
import { createCertificadoModel, deleteCertificadoModel, getCertificadoModel, getCertificadosModel, updateCertificadoModel } from "../models/certificadosModel";
import { HTTP_STATUS } from "../services/httpStatus";
import { schemaCertificados } from "../services/schema";
import { Prisma } from "@prisma/client";
import { handleCreateOne, handleDeleteOne, handleGetAll, handleGetOne, handleUpdateOne} from "../services/handleControllersRequests";


export const getCertificados: RequestHandler = async (req, res) => {

  handleGetAll({model:getCertificadosModel,res,key:"certificado(s)"})

};

export const createCertificado:RequestHandler = async (req,res)=>{

  const body = req.body

  handleCreateOne({model:createCertificadoModel,body,key:"certificado(s)",res,schema:schemaCertificados})

}

export const getCertificado: RequestHandler = async (req, res) => {

  const slug = req.body.slug

 handleGetOne({model:getCertificadoModel,key:"certificado(s)",res,slug})

};

export const updateCertificado: RequestHandler = async (req, res) => {

  const body = req.body

  const id = req.body.id

  handleUpdateOne({body,id,key:"certificado(s)",model:updateCertificadoModel,res,schema:schemaCertificados})
    
}

export const deleteCertificado: RequestHandler = async (req, res) => {
  
  const id = req.body.id

  handleDeleteOne({model:deleteCertificadoModel,id,key:"certificado(s)",res})
    
}