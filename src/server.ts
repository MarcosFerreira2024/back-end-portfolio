import express from "express";
import dotenv from "dotenv";
import rout from "./routes/routes";
import { HTTP_STATUS } from "./consts/httpStatus";
import cors from "cors";



dotenv.config();
const porta = process.env.PORTA || 3000; 

const server = express();

server.use(cors({ origin: "*"}))

server.use(express.json());

server.use(express.urlencoded({ extended: true }));

server.use(rout);

server.use((req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({ route: "Not found" }); 
});

server.listen(porta, () => {
  console.log(`Server running on port http://localhost:${porta}/`);
});
