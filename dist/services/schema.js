"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemaUserLogin = exports.schemaUserSignIn = exports.schemaCertificados = exports.schemaProjetos = void 0;
const zod_1 = __importDefault(require("zod"));
exports.schemaProjetos = zod_1.default.object({
    titulo: zod_1.default.string().min(5, "Titulo Deve ter pelo menos 5 caracteres"),
    slug: zod_1.default.string().min(1, "O slug é obrigatório"),
    descricao: zod_1.default.string().min(5, "Descricao Deve ter pelo menos 5 caracteres"),
    skills: zod_1.default.array(zod_1.default.string()).min(1, "As skills são obrigatórias"),
    skillsPath: zod_1.default.array(zod_1.default.string()).min(1, "O caminho das skills deve ser especificado"),
    photo: zod_1.default.string().min(1, "A photo é obrigatória"),
    photoDark: zod_1.default.string().min(1, "A photo em DarkMode é opcional mas deve ser preenchida corretamente").optional(),
    liveUrl: zod_1.default.string().min(1).url('A URL deve ser válida'),
    order: zod_1.default.string().min(1).max(1).optional(),
    githubUrl: zod_1.default.string().min(1).url('A URL deve ser válida'),
});
exports.schemaCertificados = zod_1.default.object({
    titulo: zod_1.default.string().min(1, 'O título é obrigatório'),
    descricao: zod_1.default.string().min(1, 'A descrição é obrigatória'),
    order: zod_1.default.string().min(1).max(1).optional(),
    horas: zod_1.default.string().min(1, 'As horas são obrigatórias'),
    slug: zod_1.default.string().min(1, 'O slug é obrigatório'),
    url: zod_1.default.string().url('A URL deve ser válida'),
});
exports.schemaUserSignIn = zod_1.default
    .object({
    name: zod_1.default.string().min(2, "O nome deve ter no minimo 2 caracteres"),
    email: zod_1.default.string().email({ message: "Email inválido" }),
    password: zod_1.default.string().min(6, "A senha deve ter no minimo 6 caracteres"),
    confirmPassword: zod_1.default
        .string()
        .min(6, "A senha deve ter no minimo 6 caracteres"),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais",
    path: ["confirmPassord"],
});
exports.schemaUserLogin = zod_1.default.object({
    email: zod_1.default.string().email({ message: "Email inválido" }), //schema zod validação de dados
    password: zod_1.default.string().min(6, "A senha deve ter no minimo 6 caracteres"),
});
