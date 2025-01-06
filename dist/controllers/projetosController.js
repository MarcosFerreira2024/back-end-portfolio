"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjeto = exports.updateProjeto = exports.getProjeto = exports.createProjeto = exports.getProjetos = void 0;
const httpStatus_1 = require("../consts/httpStatus");
const schema_1 = require("../services/schema");
const controllerRequests_1 = require("../services/controllerRequests");
const projetosModel_1 = require("../models/projetosModel");
const getProjetos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projetos = yield (0, controllerRequests_1.handleGetAll)({ model: projetosModel_1.getProjetosModel });
        if (projetos instanceof Error) {
            res.status(httpStatus_1.HTTP_STATUS.BAD_REQUEST).json({
                message: projetos.message
            });
            return;
        }
        res.status(httpStatus_1.HTTP_STATUS.OK).json(projetos);
        return;
    }
    catch (_a) {
        res.status(httpStatus_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Erro Interno"
        });
        return;
    }
});
exports.getProjetos = getProjetos;
const createProjeto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = schema_1.schemaProjetos.safeParse(req.body);
        if (!validate.success) {
            res.status(httpStatus_1.HTTP_STATUS.BAD_REQUEST).json({
                message: validate.error.flatten().fieldErrors
            });
            return;
        }
        const projetos = yield (0, controllerRequests_1.handleCreateOne)({ model: projetosModel_1.createProjetoModel, data: validate.data });
        if (projetos instanceof Error) {
            res.status(httpStatus_1.HTTP_STATUS.BAD_REQUEST).json({
                message: projetos.message
            });
            return;
        }
        res.status(httpStatus_1.HTTP_STATUS.OK).json({
            projetos
        });
        return;
    }
    catch (_a) {
        res.status(httpStatus_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Erro Interno"
        });
        return;
    }
});
exports.createProjeto = createProjeto;
const getProjeto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slug;
        if (!slug) {
            res.status(httpStatus_1.HTTP_STATUS.BAD_REQUEST).json({
                message: "Slug Obrigátorio"
            });
            return;
        }
        const projetos = yield (0, controllerRequests_1.handleGetOne)({ model: projetosModel_1.getProjetoModel, data: slug });
        if (projetos instanceof Error) {
            res.status(httpStatus_1.HTTP_STATUS.BAD_REQUEST).json({
                message: projetos.message
            });
            return;
        }
        res.status(httpStatus_1.HTTP_STATUS.OK).json({
            projetos
        });
        return;
    }
    catch (_a) {
        res.status(httpStatus_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Erro Interno"
        });
        return;
    }
});
exports.getProjeto = getProjeto;
const updateProjeto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const validate = schema_1.schemaProjetos.partial().safeParse(req.body);
        if (!validate.success) {
            res.status(httpStatus_1.HTTP_STATUS.BAD_REQUEST).json({
                message: validate.error.flatten().fieldErrors
            });
            return;
        }
        if (!id) {
            res.status(httpStatus_1.HTTP_STATUS.BAD_REQUEST).json({
                message: "Id Obrigátorio"
            });
            return;
        }
        const projetos = yield (0, controllerRequests_1.handleUpdateOne)({ data: validate.data, id, model: projetosModel_1.updateProjetoModel });
        if (projetos instanceof Error) {
            res.status(httpStatus_1.HTTP_STATUS.BAD_REQUEST).json({
                message: projetos.message
            });
            return;
        }
        res.status(httpStatus_1.HTTP_STATUS.OK).json({
            projetos
        });
        return;
    }
    catch (_a) {
        res.status(httpStatus_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Erro Interno"
        });
        return;
    }
});
exports.updateProjeto = updateProjeto;
const deleteProjeto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        if (!id) {
            res.status(httpStatus_1.HTTP_STATUS.BAD_REQUEST).json({
                message: "Id Inválido"
            });
            return;
        }
        const projetos = yield (0, controllerRequests_1.handleDeleteOne)({ model: projetosModel_1.deleteProjetoModel, id });
        if (projetos instanceof Error) {
            res.status(httpStatus_1.HTTP_STATUS.BAD_REQUEST).json({
                message: projetos.message
            });
            return;
        }
        res.status(httpStatus_1.HTTP_STATUS.OK).json({
            projetos
        });
        return;
    }
    catch (_a) {
        res.status(httpStatus_1.HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            message: "Erro Interno"
        });
        return;
    }
});
exports.deleteProjeto = deleteProjeto;
