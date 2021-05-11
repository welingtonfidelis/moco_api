import { Router } from "express";
import { CashRegisterController } from "../controllers/CashRegister";

const cashRegisterRouter = Router();
const cashRegisterController = new CashRegisterController();

cashRegisterRouter.post('/cash-registers', cashRegisterController.save);

export {
    cashRegisterRouter
}