import { Router } from "express";
import { OngController } from "../controllers/Ong";
import { inputValidateMidleware } from "../middlewares/InputValidate";
import { ongListSchema } from "../middlewares/InputValidate/schemas/ong/list";
import { ongSaveSchema } from "../middlewares/InputValidate/schemas/ong/save";

const ongRouter = Router();
const ongController = new OngController();

ongRouter.post(
    '/ongs', 
    inputValidateMidleware(ongSaveSchema),
    ongController.save,
);
ongRouter.get(
    '/ongs', 
    inputValidateMidleware(ongListSchema),
    ongController.list,
);

export {
    ongRouter
}