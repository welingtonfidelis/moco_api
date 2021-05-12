import { Router } from "express";
import { OngController } from "../controllers/Ong";

const ongRouter = Router();
const ongController = new OngController();

ongRouter.post('/ongs', ongController.save);
ongRouter.get('/ongs', ongController.list);

export {
    ongRouter
}