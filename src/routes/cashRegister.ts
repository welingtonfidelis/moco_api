import { Router } from "express";
import { CashRegisterController } from "../controllers/CashRegister";
import { inputValidateMidleware } from "../middlewares/InputValidate";
import { cashRegisterDeleteSchema } from "../middlewares/InputValidate/schemas/cashRegister/delete";
import { cashRegisterListSchema } from "../middlewares/InputValidate/schemas/cashRegister/list";
import { cashRegisterReportSchema } from "../middlewares/InputValidate/schemas/cashRegister/report";
import { cashRegisterReportCashOnHandSchema } from "../middlewares/InputValidate/schemas/cashRegister/reportCashOnHand";
import { cashRegisterSaveSchema } from "../middlewares/InputValidate/schemas/cashRegister/save";
import { cashRegisterShowSchema } from "../middlewares/InputValidate/schemas/cashRegister/show";
import { cashRegisterUpdateSchema } from "../middlewares/InputValidate/schemas/cashRegister/update";

const cashRegisterRouter = Router();
const cashRegisterController = new CashRegisterController();

cashRegisterRouter.post(
    '/cash-registers', 
    inputValidateMidleware(cashRegisterSaveSchema),
    cashRegisterController.save
);
cashRegisterRouter.get(
    '/cash-registers', 
    inputValidateMidleware(cashRegisterListSchema),
    cashRegisterController.list
);
cashRegisterRouter.get(
    '/cash-registers/report/cash-on-hand',
    inputValidateMidleware(cashRegisterReportCashOnHandSchema),
    cashRegisterController.reportCashOnHand
);
cashRegisterRouter.get(
    '/cash-registers/report',
    inputValidateMidleware(cashRegisterReportSchema),
    cashRegisterController.reportList
);
cashRegisterRouter.get(
    '/cash-registers/:id', 
    inputValidateMidleware(cashRegisterShowSchema),
    cashRegisterController.show
);
cashRegisterRouter.put(
    '/cash-registers/:id', 
    inputValidateMidleware(cashRegisterUpdateSchema),
    cashRegisterController.update
);
cashRegisterRouter.delete(
    '/cash-registers/:id', 
    inputValidateMidleware(cashRegisterDeleteSchema),
    cashRegisterController.delete
);

export {
    cashRegisterRouter
}