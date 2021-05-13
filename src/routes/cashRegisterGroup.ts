import { Router } from "express";
import { CashRegisterGroupController } from "../controllers/CashRegisterGroup";
import { inputValidateMidleware } from "../middlewares/InputValidate";
import { cashRegisterGroupDeleteSchema } from "../middlewares/InputValidate/schemas/cashRegisterGroup/delete";
import { cashRegisterGroupListSchema } from "../middlewares/InputValidate/schemas/cashRegisterGroup/list";
import { cashRegisterGroupSaveSchema } from "../middlewares/InputValidate/schemas/cashRegisterGroup/save";
import { cashRegisterGroupShowSchema } from "../middlewares/InputValidate/schemas/cashRegisterGroup/show";
import { cashRegisterGroupUpdateSchema } from "../middlewares/InputValidate/schemas/cashRegisterGroup/update";

const cashRegisterGroupRouter = Router();
const cashRegisterGroupController = new CashRegisterGroupController();

cashRegisterGroupRouter.post(
    '/cash-register-groups',
    inputValidateMidleware(cashRegisterGroupSaveSchema),
    cashRegisterGroupController.save
);
cashRegisterGroupRouter.get(
    '/cash-register-groups',
    inputValidateMidleware(cashRegisterGroupListSchema),
    cashRegisterGroupController.list
);
cashRegisterGroupRouter.get(
    '/cash-register-groups/:id',
    inputValidateMidleware(cashRegisterGroupShowSchema),
    cashRegisterGroupController.show
);
cashRegisterGroupRouter.put(
    '/cash-register-groups/:id',
    inputValidateMidleware(cashRegisterGroupUpdateSchema),
    cashRegisterGroupController.update
);
cashRegisterGroupRouter.delete(
    '/cash-register-groups/:id',
    inputValidateMidleware(cashRegisterGroupDeleteSchema),
    cashRegisterGroupController.delete
);

export {
    cashRegisterGroupRouter
}