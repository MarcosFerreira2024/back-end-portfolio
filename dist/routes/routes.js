"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
//import { getProjetos } from "../controllers/projetosController";
const userController_1 = require("../controllers/userController");
const authMidlleware_1 = require("../middleware/authMidlleware");
const projetosController_1 = require("../controllers/projetosController");
const certificadosController_1 = require("../controllers/certificadosController");
const httpStatus_1 = __importDefault(require("../consts/httpStatus"));
const rout = (0, express_1.Router)();
// Rota para verificar se o servidor está online
rout.get("/ping", (req, res) => {
    res.status(httpStatus_1.default.OK).json({ pong: true });
});
// Rotas de Usuário
rout.post("/register", userController_1.registerUser); // Rota para CRIAR um usuario
rout.get("/login", userController_1.loginUser); // Rota para LOGAR usuário
rout.get("/user", authMidlleware_1.middlewareAuth, userController_1.getUserInfo); // Rota para LISTAR usuário especifico
rout.get("/users", authMidlleware_1.middlewareAuth, authMidlleware_1.middlewareAdmin, userController_1.getAllUsers); // Rota para LISTAR todos os usuários
rout.put("/user", authMidlleware_1.middlewareAuth, userController_1.updateUser); // Rota para ALTERAR um usuário
rout.delete("/user", authMidlleware_1.middlewareAuth, userController_1.deleteUser);
// Rotas de Projeto
rout.get("/projetos", projetosController_1.getProjetos); // Rota para LISTAR todos os projetos
rout.get("/projeto/:slug", projetosController_1.getProjeto); // Rota para LISTAR um projeto
rout.post("/projeto", authMidlleware_1.middlewareAuth, authMidlleware_1.middlewareAdmin, projetosController_1.createProjeto); // Rota para CRIAR um projeto
rout.delete("/projeto", authMidlleware_1.middlewareAuth, authMidlleware_1.middlewareAdmin, projetosController_1.deleteProjeto); // Rota para DELETAR um projeto
rout.put("/projeto", authMidlleware_1.middlewareAuth, authMidlleware_1.middlewareAdmin, projetosController_1.updateProjeto); // Rota para ALTERAR um projeto
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
rout.get("/certificados", certificadosController_1.getCertificados); // Rota para LISTAR todos os Certificados
rout.get("/certificado/:slug", certificadosController_1.getCertificado); // Rota para LISTAR um certificado
rout.post("/certificado", authMidlleware_1.middlewareAuth, authMidlleware_1.middlewareAdmin, certificadosController_1.createCertificado); // Rota para CRIAR um certificado
rout.delete("/certificado", authMidlleware_1.middlewareAuth, authMidlleware_1.middlewareAdmin, certificadosController_1.deleteCertificado); // Rota para DELETAR um certificado
rout.put("/certificado", authMidlleware_1.middlewareAuth, authMidlleware_1.middlewareAdmin, certificadosController_1.updateCertificado); // Rota para ALTERAR um certificado
/* Esqueleto Requisição Post Certificado
{
  "titulo":"",
  "descricao":"",
  "horas":"",
  "slug":"",
  "url":"",
}
*/
exports.default = rout;
