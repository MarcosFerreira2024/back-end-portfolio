"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes/routes"));
const httpStatus_1 = __importDefault(require("./consts/httpStatus"));
dotenv_1.default.config();
const porta = process.env.PORTA || 3000;
const server = (0, express_1.default)();
server.use((0, cors_1.default)({ origin: "*" }));
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use(routes_1.default);
server.use((req, res) => {
    res.status(httpStatus_1.default.NOT_FOUND).json({ route: "Not found" });
});
server.listen(porta, () => {
    console.log(`Server running on port http://localhost:${porta}/`);
});
