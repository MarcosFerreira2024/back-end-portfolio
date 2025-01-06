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
exports.deleteProjetoModel = exports.updateProjetoModel = exports.getProjetoModel = exports.createProjetoModel = exports.getProjetosModel = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const findModel_1 = require("./findModel");
const updateModel_1 = require("./updateModel");
const deleteModel_1 = require("./deleteModel");
const getProjetosModel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projetos = yield (0, findModel_1.findAllModel)({
            data: {
                id: true,
                titulo: true,
                descricao: true,
                skills: true,
                skillsPath: true,
                slug: true,
                liveUrl: true,
                githubUrl: true,
                photo: true,
                photoDark: true,
                createdAt: true,
                updatedAt: true,
            },
            model: prisma_1.default.projetos
        });
        if (projetos instanceof Error) {
            throw new Error(projetos.message);
        }
        return projetos;
    }
    catch (e) {
        return e;
    }
});
exports.getProjetosModel = getProjetosModel;
const createProjetoModel = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projeto = yield prisma_1.default.projetos.create({ data });
        if (!projeto) {
            throw new Error("Dados Inválidos");
        }
        return projeto;
    }
    catch (e) {
        if (e instanceof Error && e.message.includes("slug")) {
            return new Error("Slug já cadastrado");
        }
        return e;
    }
});
exports.createProjetoModel = createProjetoModel;
const getProjetoModel = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const projeto = yield (0, findModel_1.findUniqueModel)({
            find: "slug",
            value: slug,
            data: {
                id: true,
                titulo: true,
                descricao: true,
                slug: true,
                skills: true,
                githubUrl: true,
                liveUrl: true,
                photo: true,
                skillsPath: true,
                createdAt: true,
                updatedAt: true,
            },
            model: prisma_1.default.projetos
        });
        if (projeto instanceof Error) {
            throw new Error(projeto.message);
        }
        return projeto;
    }
    catch (e) {
        return e;
    }
});
exports.getProjetoModel = getProjetoModel;
const updateProjetoModel = (id, validateData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield (0, updateModel_1.updateModel)({
            find: "id",
            value: id,
            data: validateData,
            model: prisma_1.default.projetos,
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
exports.updateProjetoModel = updateProjetoModel;
const deleteProjetoModel = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const updated = yield (0, deleteModel_1.deleteModel)({
            find: "id",
            value: id,
            model: prisma_1.default.projetos,
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
exports.deleteProjetoModel = deleteProjetoModel;
