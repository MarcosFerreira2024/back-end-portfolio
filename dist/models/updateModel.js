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
exports.updateModel = void 0;
const updateModel = (_a) => __awaiter(void 0, [_a], void 0, function* ({ find, value, data, model }) {
    try {
        const updated = yield model.update({
            where: {
                [find]: value
            },
            data,
        });
        if (!updated) {
            throw new Error("Não foi possivel Atualizar");
        }
        return updated;
    }
    catch (e) {
        if (e instanceof Error && e.message.includes("not found")) {
            throw new Error(`${find} não foi encontrado`);
        }
        return e;
    }
});
exports.updateModel = updateModel;
