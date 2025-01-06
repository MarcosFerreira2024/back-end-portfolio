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
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.getUserInfo = exports.loginUser = exports.registerUser = void 0;
const userModel_1 = require("../models/userModel");
const bcrypt_1 = __importDefault(require("bcrypt"));
const schema_1 = require("../services/schema");
const token_1 = require("../services/token");
const httpStatus_1 = __importDefault(require("../consts/httpStatus"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.role = "USER"; //seta a role como user caso alguem mal intencionado tente mudar a role na requisição
    const parsedData = schema_1.schemaUserSignIn.safeParse(req.body);
    try {
        if (!parsedData.success) {
            //Se acontecer algum erro a função irá retornar um erro explicando o que aconteceu
            res
                .status(httpStatus_1.default.BAD_REQUEST)
                .json({ message: parsedData.error.flatten().fieldErrors });
            return;
        }
        //criptografia das senhas
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(parsedData.data.password, salt);
        const user = yield (0, userModel_1.registerModel)({
            //usando a função createUserModel para criar um novo usuario
            name: parsedData.data.name,
            email: parsedData.data.email,
            password: hashedPassword,
        });
        if (user instanceof Error) {
            res.status(httpStatus_1.default.BAD_REQUEST).json({ message: user.message });
            return;
        }
        res.status(httpStatus_1.default.OK).json({
            user
        });
        return;
    }
    catch (_a) {
        res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({ message: "Erro interno" });
    }
});
exports.registerUser = registerUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // pega um usuário especifico e salva seu token
    try {
        const data = schema_1.schemaUserLogin.safeParse(req.body);
        if (data.success) {
            const userToken = yield (0, userModel_1.loginModel)(data.data.email, data.data.password); //retorna o token do usuário
            if (userToken instanceof Error) {
                res.status(httpStatus_1.default.BAD_REQUEST).json(userToken.message);
                return;
            }
            res.status(httpStatus_1.default.OK).json(userToken);
            return;
        }
        res.status(httpStatus_1.default.BAD_REQUEST).json({ message: data.error.flatten().fieldErrors });
    }
    catch (e) {
        res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({ message: "Erro interno" });
    }
});
exports.loginUser = loginUser;
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.headers.authorization && req.body.password) {
        try {
            const token = yield (0, token_1.getToken)(req.headers.authorization);
            if (!token) {
                throw new Error("Token Inválido");
            }
            const user = yield (0, userModel_1.getUserInfoModel)(token, req.body.password);
            if (user instanceof Error) {
                res.status(httpStatus_1.default.BAD_REQUEST).json({
                    message: user.message
                });
                return;
            }
            res.status(httpStatus_1.default.OK).json({
                user
            });
            return;
        }
        catch (e) {
            res.status(httpStatus_1.default.BAD_REQUEST).json({
                message: e
            });
        }
    }
    res.status(httpStatus_1.default.BAD_REQUEST).json({
        message: "Dados Inválidos"
    });
    return;
});
exports.getUserInfo = getUserInfo;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield (0, userModel_1.getAllUsersModel)();
        if (users instanceof Error) {
            res.status(httpStatus_1.default.BAD_REQUEST).json({
                message: users.message
            });
        }
        res.status(httpStatus_1.default.OK).json({
            users,
        });
    }
    catch (_a) {
        res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
            message: "ERRO INTERNO",
        });
    }
});
exports.getAllUsers = getAllUsers;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.headers.authorization && req.body.password) {
            const token = yield (0, token_1.getToken)(req.headers.authorization);
            if (token) {
                const updated = yield (0, userModel_1.updateUserModel)(token, req.body);
                if (updated instanceof Error) {
                    res.status(httpStatus_1.default.BAD_REQUEST).json({
                        message: updated.message
                    });
                    return;
                }
                res.status(httpStatus_1.default.OK).json({
                    message: updated
                });
                return;
            }
            res.status(httpStatus_1.default.BAD_REQUEST).json({
                message: "Token Expirado ou inválido"
            });
            return;
        }
        res.status(httpStatus_1.default.BAD_REQUEST).json({
            message: "Senha necessária"
        });
        return;
    }
    catch (e) {
        res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Erro Interno"
        });
        return;
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (req.body);
    try {
        if (req.headers.authorization && req.body.password) {
            const token = yield (0, token_1.getToken)(req.headers.authorization);
            if (token) {
                const deleted = yield (0, userModel_1.deleteUserModel)(token, req.body.password);
                if (deleted instanceof Error) {
                    res.status(httpStatus_1.default.BAD_REQUEST).json({
                        message: deleted.message
                    });
                    return;
                }
                res.status(httpStatus_1.default.OK).json({
                    deleted
                });
                return;
            }
            res.status(httpStatus_1.default.BAD_REQUEST).json({
                message: "Token Expirado ou inválido"
            });
            return;
        }
        res.status(httpStatus_1.default.BAD_REQUEST).json({
            message: "Insira sua senha"
        });
        return;
    }
    catch (_a) {
        res.status(httpStatus_1.default.INTERNAL_SERVER_ERROR).json({
            message: "Erro Interno"
        });
    }
});
exports.deleteUser = deleteUser;
