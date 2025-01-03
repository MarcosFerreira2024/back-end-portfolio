import { Router } from "express";
import { HTTP_STATUS } from "../consts/httpStatus";
//import { getProjetos } from "../controllers/projetosController";
import {
  getAllUsers,
  getUserInfo,
  updateUser,
  registerUser,
  loginUser,
  deleteUser,
} from "../controllers/userController";

import { middlewareAdmin, middlewareAuth } from "../middleware/authMidlleware";
import {
  createProjeto,
  getProjeto,
  getProjetos,
  deleteProjeto,
  updateProjeto,
} from "../controllers/projetosController";
import { createCertificado, deleteCertificado, getCertificado, getCertificados, updateCertificado } from "../controllers/certificadosController";


const rout = Router();

// Rota para verificar se o servidor está online
rout.get("/ping", (req, res) => {
  res.status(HTTP_STATUS.OK).json({ pong: true });
});

// Rotas de Usuário

rout.post("/register", registerUser); // Rota para CRIAR um usuario

rout.get("/login", loginUser); // Rota para LOGAR usuário

rout.get("/user", middlewareAuth, getUserInfo); // Rota para LISTAR usuário especifico

rout.get("/users", middlewareAuth, middlewareAdmin, getAllUsers); // Rota para LISTAR todos os usuários

rout.put("/user", middlewareAuth, updateUser); // Rota para ALTERAR um usuário

rout.delete("/user",middlewareAuth,deleteUser)
// Rotas de Projeto

rout.get("/projetos", getProjetos); // Rota para LISTAR todos os projetos

rout.get("/projeto/:slug", getProjeto); // Rota para LISTAR um projeto

rout.post("/projeto", middlewareAuth, middlewareAdmin, createProjeto); // Rota para CRIAR um projeto

rout.delete("/projeto", middlewareAuth, middlewareAdmin, deleteProjeto); // Rota para DELETAR um projeto

rout.put("/projeto", middlewareAuth, middlewareAdmin, updateProjeto); // Rota para ALTERAR um projeto


/* Esqueleto Requisição Post Projeto
{
  "titulo":"",
  "descricao":"",
  "slug":"",
  "skills":[],
  "skillsPath":[],
  "photo":"",
  "liveUrl":"",
  "githubUrl":""
}
*/

// Rotas de Certificados

rout.get("/certificados", getCertificados); // Rota para LISTAR todos os Certificados

rout.get("/certificado/:slug", getCertificado); // Rota para LISTAR um certificado

rout.post("/certificado", middlewareAuth, middlewareAdmin, createCertificado); // Rota para CRIAR um certificado

rout.delete("/certificado", middlewareAuth, middlewareAdmin, deleteCertificado); // Rota para DELETAR um certificado

rout.put("/certificado", middlewareAuth, middlewareAdmin, updateCertificado); // Rota para ALTERAR um certificado

/* Esqueleto Requisição Post Certificado
{
  "titulo":"",
  "descricao":"",
  "horas":"",
  "slug":"",
  "url":"",
}
*/
export default rout;
