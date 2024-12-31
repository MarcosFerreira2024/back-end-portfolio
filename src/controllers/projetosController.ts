import {
  createProjetoModel,
  deleteProjetoModel,
  getProjetoModel,
  getProjetosModel,
  updateProjetoModel,
} from "../models/projetosModel";
import { RequestHandler } from "express";
import { schemaProjetos } from "../services/schema";
import { handleCreateOne, handleDeleteOne, handleGetAll, handleGetOne, handleUpdateOne } from "../services/handleControllersRequests";

export const getProjetos: RequestHandler = async (req, res) => {
    handleGetAll({model:getProjetosModel,res,key:"projeto(s)"})

};

export const createProjeto: RequestHandler = async (req, res) => {

  const body = req.body

  handleCreateOne({model:createProjetoModel,body,key:"projeto(s)",res,schema:schemaProjetos})

};

export const getProjeto: RequestHandler = async (req, res) => {

  const slug = req.body.slug

  handleGetOne({model:getProjetoModel,key:"projeto(s)",res,slug})

};


export const updateProjeto: RequestHandler = async (req, res) => {
  
    const body = req.body

    const id = req.body.id
  
    handleUpdateOne({body,id,key:"certificado(s)",model:updateProjetoModel,res,schema:schemaProjetos})
 
}

export const deleteProjeto: RequestHandler = async (req, res) => {
  
 const id = req.body.id

 handleDeleteOne({model:deleteProjetoModel,id,key:"projeto(s)",res})

}