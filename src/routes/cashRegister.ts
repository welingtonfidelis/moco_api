import { Router } from "express";
import { CashRegisterController } from "../controllers/CashRegister";

const cashRegisterRouter = Router();
const cashRegisterController = new CashRegisterController();

cashRegisterRouter.post('/cash-registers', cashRegisterController.save);
cashRegisterRouter.get('/cash-registers', cashRegisterController.list);
cashRegisterRouter.get('/cash-registers/:id', cashRegisterController.show);
cashRegisterRouter.put('/cash-registers/:id', cashRegisterController.update);
cashRegisterRouter.delete('/cash-registers/:id', cashRegisterController.delete);

export {
    cashRegisterRouter
}