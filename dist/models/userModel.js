"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserModel = exports.VerifyUser = exports.updateUserModel = exports.getAllUsersModel = exports.getUserInfoModel = exports.loginModel = exports.registerModel = void 0;
const prisma_1 = __importDefault(require("../libs/prisma"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const JWT = __importStar(require("jsonwebtoken"));
const findModel_1 = require("./findModel");
const deleteModel_1 = require("./deleteModel");
const updateModel_1 = require("./updateModel");
dotenv_1.default.config();
const registerModel = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma_1.default.user.create({ data });
        if (!user) {
            throw new Error("Dados inválidos");
        }
        return user;
    }
    catch (error) {
        if (error instanceof Error && error.message.includes("email")) {
            return new Error("Email já cadastrado");
        }
    }
});
exports.registerModel = registerModel;
const loginModel = (email, senha) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const findedUser = yield (0, findModel_1.findUniqueModel)({
            find: "email",
            value: email,
            data: {
                id: true,
                email: true,
                password: true
            },
            model: prisma_1.default.user
        });
        if (findedUser instanceof Error) {
            throw new Error(findedUser.message);
        }
        const validaSenha = yield bcrypt_1.default.compare(senha, findedUser.password);
        if (validaSenha) {
            const token = JWT.sign({ id: findedUser.id, email: findedUser.email }, process.env.MY_SECRET_KEY);
            return {
                message: "Usuario logado",
                token,
            };
        }
        throw new Error("Senha Incorreta");
    }
    catch (e) {
        return e;
    }
});
exports.loginModel = loginModel;
const getUserInfoModel = (token, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verifiedUser = yield (0, exports.VerifyUser)(token, password);
        if (verifiedUser instanceof Error) {
            throw new Error(verifiedUser.message);
        }
        return verifiedUser;
    }
    catch (e) {
        return e;
    }
});
exports.getUserInfoModel = getUserInfoModel;
const getAllUsersModel = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield prisma_1.default.user.findMany({
            select: {
                name: true,
                id: true,
                createdAt: true,
                role: true,
                updatedAt: true,
            },
        });
        if (!users) {
            throw new Error("Nenhum usuário encontrado");
        }
        return users;
    }
    catch (e) {
        return e;
    }
});
exports.getAllUsersModel = getAllUsersModel;
const updateUserModel = (token, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, exports.VerifyUser)(token, data.password);
        const { password, role } = data, newData = __rest(data, ["password", "role"]);
        if (user instanceof Error) {
            throw new Error(user.message);
        }
        const updatedUser = yield (0, updateModel_1.updateModel)({ find: "id", model: prisma_1.default.user, value: user.id, data: newData });
        if (updatedUser instanceof Error) {
            throw new Error(updatedUser.message);
        }
        const newToken = JWT.sign({ id: user.id, email: newData.email }, process.env.MY_SECRET_KEY);
        return { updatedUser, newToken };
    }
    catch (e) {
        if (e instanceof Error && e.message.includes("data")) {
            return new Error("Token Invalido");
        }
        return e;
    }
});
exports.updateUserModel = updateUserModel;
const VerifyUser = (token, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jwtToken = JWT.verify(token, process.env.MY_SECRET_KEY);
        const decoded = jwtToken;
        if (decoded) {
            const user = yield (0, findModel_1.findUniqueModel)({
                find: "email",
                value: decoded.email,
                model: prisma_1.default.user,
                data: {
                    id: true,
                    name: true,
                    role: true,
                    password: true,
                },
            });
            const comparedPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!comparedPassword) {
                throw new Error("Senha Incorreta");
            }
            return user;
        }
        throw new Error("Token Inválido");
    }
    catch (e) {
        return e;
    }
});
exports.VerifyUser = VerifyUser;
const deleteUserModel = (token, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, exports.VerifyUser)(token, password);
        if (user instanceof Error) {
            throw new Error(user.message);
        }
        const deleted = yield (0, deleteModel_1.deleteModel)({ find: "id", model: prisma_1.default.user, value: user.id });
        if (deleted) {
            return deleted;
        }
        throw new Error("Usuário não foi Encontrado");
    }
    catch (e) {
        if (e instanceof Error && e.message.includes("data")) {
            return new Error("Usuário não encontrado");
        }
        return e;
    }
});
exports.deleteUserModel = deleteUserModel;
