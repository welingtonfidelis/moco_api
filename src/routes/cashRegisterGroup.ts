import { Router } from "express";
import { CashRegisterGroupController } from "../controllers/CashRegisterGroup";

const cashRegisterGroupRouter = Router();
const cashRegisterGroupController = new CashRegisterGroupController();

cashRegisterGroupRouter.post('/cash-register-groups', cashRegisterGroupController.save);
cashRegisterGroupRouter.get('/cash-register-groups', cashRegisterGroupController.list);
cashRegisterGroupRouter.get('/cash-register-groups/:id', cashRegisterGroupController.show);
cashRegisterGroupRouter.put('/cash-register-groups/:id', cashRegisterGroupController.update);
cashRegisterGroupRouter.delete('/cash-register-groups/:id', cashRegisterGroupController.delete);

export {
    cashRegisterGroupRouter
}