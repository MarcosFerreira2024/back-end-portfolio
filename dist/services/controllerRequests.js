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
exports.handleUpdateOne = exports.handleDeleteOne = exports.handleGetOne = exports.handleCreateOne = exports.handleGetAll = void 0;
const handleGetAll = (_a) => __awaiter(void 0, [_a], void 0, function* ({ model }) {
    try {
        const data = yield model();
        if (!data) {
            throw new Error("Nenhum dado encontrado");
        }
        return data;
    }
    catch (e) {
        return e;
    }
});
exports.handleGetAll = handleGetAll;
const handleCreateOne = (_a) => __awaiter(void 0, [_a], void 0, function* ({ model, data }) {
    try {
        const created = yield model(data);
        if (created instanceof Error) {
            throw new Error(created.message);
        }
        return created;
    }
    catch (e) {
        return e;
    }
});
exports.handleCreateOne = handleCreateOne;
const handleGetOne = (_a) => __awaiter(void 0, [_a], void 0, function* ({ model, data }) {
    try {
        const dataSlug = yield model(data);
        if (dataSlug) {
            return dataSlug;
        }
        throw new Error("Slug Invalido");
    }
    catch (e) {
        return e;
    }
});
exports.handleGetOne = handleGetOne;
const handleDeleteOne = (_a) => __awaiter(void 0, [_a], void 0, function* ({ model, id }) {
    if (!id) {
        throw new Error("Id inválido");
    }
    ;
    try {
        const deletedData = yield model(id);
        if (deletedData) {
            return deletedData;
        }
        throw new Error("Não encontrado");
    }
    catch (e) {
        return e;
    }
});
exports.handleDeleteOne = handleDeleteOne;
const handleUpdateOne = (_a) => __awaiter(void 0, [_a], void 0, function* ({ id, model, data }) {
    try {
        const updated = yield model(id, data);
        if (!updated) {
            throw new Error("Usuário não encontrado");
        }
        return updated;
    }
    catch (e) {
        return e;
    }
});
exports.handleUpdateOne = handleUpdateOne;
