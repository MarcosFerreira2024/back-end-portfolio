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
exports.middlewareAdmin = exports.middlewareAuth = void 0;
const httpStatus_1 = require("../consts/httpStatus");
const prisma_1 = __importDefault(require("../libs/prisma"));
const token_1 = require("../services/token");
const findModel_1 = require("../models/findModel");
const middlewareAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        res
            .status(httpStatus_1.HTTP_STATUS.UNAUTHORIZED)
            .json({ message: "Você não está logado" });
        return;
    }
    try {
        const email = yield (0, token_1.verifyToken)(req.headers.authorization.split(" ")[1]);
        if (!email) {
            res.status(httpStatus_1.HTTP_STATUS.UNAUTHORIZED).json({ message: "Token invalido" });
            return;
        }
        next();
        return;
    }
    catch (_a) {
        res
            .status(httpStatus_1.HTTP_STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: "Erro interno" });
    }
});
exports.middlewareAuth = middlewareAuth;
const middlewareAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers.authorization) {
        res
            .status(httpStatus_1.HTTP_STATUS.UNAUTHORIZED)
            .json({ message: "Você não está logado" });
        return;
    }
    try {
        const email = yield (0, token_1.verifyToken)(req.headers.authorization.split(" ")[1]);
        if (!email) {
            res
                .status(httpStatus_1.HTTP_STATUS.UNAUTHORIZED)
                .json({ message: "Token invalido ou expirado" });
            return;
        }
        const user = yield (0, findModel_1.findUniqueModel)({
            find: "email",
            value: email,
            data: {
                role: true
            },
            model: prisma_1.default.user
        });
        if (!user || user.role !== "ADMIN") { // verifica se o usuario é admin ou se ele nao existe e esta tentando acessar a rota
            res
                .status(httpStatus_1.HTTP_STATUS.FORBIDDEN)
                .json({ message: "Você não tem permissão para acessar essa rota" });
            return;
        }
        next();
        return;
    }
    catch (e) {
        res
            .status(httpStatus_1.HTTP_STATUS.UNAUTHORIZED)
            .json({ message: "Token invalido ou expirado" });
    }
});
exports.middlewareAdmin = middlewareAdmin;
