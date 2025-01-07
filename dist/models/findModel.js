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
exports.findAllModel = exports.findUniqueModel = void 0;
const findUniqueModel = (_a) => __awaiter(void 0, [_a], void 0, function* ({ find, value, data, model }) {
    try {
        const search = yield model.findUnique({
            where: {
                [find]: value,
            },
            select: data
        });
        if (!search) {
            throw new Error("Não foi Encontrado");
        }
        return search;
    }
    catch (e) {
        return e;
    }
});
exports.findUniqueModel = findUniqueModel;
const findAllModel = (_a) => __awaiter(void 0, [_a], void 0, function* ({ data, model, order = "createdAt", orderValue = "desc" }) {
    try {
        const search = yield model.findMany({
            select: data,
            orderBy: [{
                    [order]: orderValue
                }, { "createdAt": "asc" }],
        });
        if (!search) {
            throw new Error("Erro ao buscar");
        }
        return search;
    }
    catch (e) {
        return e;
    }
});
exports.findAllModel = findAllModel;
