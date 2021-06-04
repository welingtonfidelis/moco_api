import { Router } from "express";
import { authMidleware } from "../middlewares/Auth";
import { noAuthRouter } from "./noAuth";
import { cashRegisterRouter } from "./cashRegister";
import { cashRegisterGroupRouter } from "./cashRegisterGroup";
import { ongRouter } from "./ong";
import { userRouter } from "./user";

const router = Router();

router.use(noAuthRouter);

router.use(authMidleware);

router.use(cashRegisterRouter);
router.use(cashRegisterGroupRouter);
router.use(ongRouter);
router.use(userRouter);

export {
    router
}