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
exports.deleteCertificadoModel = exports.updateCertificadoModel = exports.getCertificadoModel = exports.createCertificadoModel = exports.getCertificadosModel = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const findModel_1 = require("./findModel");
const updateModel_1 = require("./updateModel");
const deleteModel_1 = require("./deleteModel");
const getCertificadosModel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const certificados = yield (0, findModel_1.findAllModel)({
            data: {
                id: true,
                titulo: true,
                descricao: true,
                horas: true,
                order: true,
                slug: true,
                url: true,
                createdAt: true,
                updatedAt: true,
            },
            model: prisma_1.default.certficados,
            order: "horas",
            orderValue: "asc"
        });
        if (certificados instanceof Error) {
            throw new Error(certificados.message);
        }
        return certificados;
    }
    catch (e) {
        return e;
    }
});
exports.getCertificadosModel = getCertificadosModel;
const createCertificadoModel = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const certificado = yield prisma_1.default.certficados.create({ data });
        if (!certificado) {
            throw new Error("Dados Inválidos");
        }
        return certificado;
    }
    catch (e) {
        if (e instanceof Error && e.message.includes("slug")) {
            return new Error("Slug já cadastrado");
        }
        return e;
    }
});
exports.createCertificadoModel = createCertificadoModel;
const getCertificadoModel = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const certificado = yield (0, findModel_1.findUniqueModel)({
            find: "slug",
            value: slug,
            data: {
                id: true,
                titulo: true,
                descricao: true,
                slug: true,
                horas: true,
                createdAt: true,
                updatedAt: true,
            },
            model: prisma_1.default.certficados
        });
        if (certificado instanceof Error) {
            throw new Error(certificado.message);
        }
        return certificado;
    }
    catch (e) {
        return e;
    }
});
exports.getCertificadoModel = getCertificadoModel;
const updateCertificadoModel = (id, validateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield (0, updateModel_1.updateModel)({
            find: "id",
            value: id,
            data: validateData,
            model: prisma_1.default.certficados,
        });
        if (updated instanceof Error) {
            throw new Error(updated.message);
        }
        return updated;
    }
    catch (e) {
        return e;
    }
});
exports.updateCertificadoModel = updateCertificadoModel;
const deleteCertificadoModel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield (0, deleteModel_1.deleteModel)({
            find: "id",
            value: id,
            model: prisma_1.default.certficados,
        });
        if (updated instanceof Error) {
            throw new Error(updated.message);
        }
        return updated;
    }
    catch (e) {
        return e;
    }
});
exports.deleteCertificadoModel = deleteCertificadoModel;
