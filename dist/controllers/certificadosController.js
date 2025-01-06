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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCertificado = exports.updateCertificado = exports.getCertificado = exports.createCertificado = exports.getCertificados = void 0;
const certificadosModel_1 = require("../models/certificadosModel");
const schema_1 = require("../services/schema");
const controllerRequests_1 = require("../services/controllerRequests");
const httpStatus_1 = __importDefault(require("../consts/httpStatus"));
const getCertificados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const certificados = yield (0, controllerRequests_1.handleGetAll)({ model: certificadosModel_1.getCertificadosModel });
        if (certificados instanceof Error) {
            res.status(httpStatus_1.default.BAD_GATEWAY).json({
                message: certificados.message
            });
            return;
        }
        res.status(httpStatus_1.default.OK).json(certificados);
        return;
    }
    catch (_a) {
        res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Erro Interno"
        });
        return;
    }
});
exports.getCertificados = getCertificados;
const createCertificado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const validate = schema_1.schemaCertificados.safeParse(req.body);
        if (!validate.success) {
            res.status(httpStatus_1.default.BAD_REQUEST).json({
                message: validate.error.flatten().fieldErrors
            });
            return;
        }
        const certificados = yield (0, controllerRequests_1.handleCreateOne)({ model: certificadosModel_1.createCertificadoModel, data: validate.data });
        if (certificados instanceof Error) {
            res.status(httpStatus_1.default.BAD_REQUEST).json({
                message: certificados.message
            });
            return;
        }
        res.status(httpStatus_1.default.OK).json({
            certificados
        });
        return;
    }
    catch (_a) {
        res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Erro Interno"
        });
        return;
    }
});
exports.createCertificado = createCertificado;
const getCertificado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const slug = req.params.slug;
        if (!slug) {
            res.status(httpStatus_1.default.BAD_REQUEST).json({
                message: "Slug Obrigátorio"
            });
            return;
        }
        const certificados = yield (0, controllerRequests_1.handleGetOne)({ model: certificadosModel_1.getCertificadoModel, data: slug });
        if (certificados instanceof Error) {
            res.status(httpStatus_1.default.BAD_REQUEST).json({
                message: certificados.message
            });
            return;
        }
        res.status(httpStatus_1.default.OK).json({
            certificados
        });
        return;
    }
    catch (_a) {
        res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Erro Interno"
        });
        return;
    }
});
exports.getCertificado = getCertificado;
const updateCertificado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        const validate = schema_1.schemaCertificados.partial().safeParse(req.body);
        if (!validate.success) {
            res.status(httpStatus_1.default.BAD_REQUEST).json({
                message: validate.error.flatten().fieldErrors
            });
            return;
        }
        if (!id) {
            res.status(httpStatus_1.default.BAD_REQUEST).json({
                message: "Id Obrigátorio"
            });
            return;
        }
        const certificados = yield (0, controllerRequests_1.handleUpdateOne)({ data: validate.data, id, model: certificadosModel_1.updateCertificadoModel });
        if (certificados instanceof Error) {
            res.status(httpStatus_1.default.BAD_REQUEST).json({
                message: certificados.message
            });
            return;
        }
        res.status(httpStatus_1.default.OK).json({
            certificados
        });
        return;
    }
    catch (_a) {
        res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Erro Interno"
        });
        return;
    }
});
exports.updateCertificado = updateCertificado;
const deleteCertificado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.body.id;
        if (!id) {
            res.status(httpStatus_1.default.BAD_REQUEST).json({
                message: "Id Inválido"
            });
            return;
        }
        const certificados = yield (0, controllerRequests_1.handleDeleteOne)({ model: certificadosModel_1.deleteCertificadoModel, id });
        if (certificados instanceof Error) {
            res.status(httpStatus_1.default.BAD_REQUEST).json({
                message: certificados.message
            });
            return;
        }
        res.status(httpStatus_1.default.OK).json({
            certificados
        });
        return;
    }
    catch (_a) {
        res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Erro Interno"
        });
        return;
    }
});
exports.deleteCertificado = deleteCertificado;
