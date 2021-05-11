import { Router } from "express";
import { authMidleware } from "../middlewares/Auth";
import { authRouter } from "./auth";
import { cashRegisterRouter } from "./cashRegister";
import { cashRegisterGroupRouter } from "./cashRegisterGroup";

const router = Router();

router.use(authRouter);

router.use(authMidleware);

router.use(cashRegisterRouter);
router.use(cashRegisterGroupRouter);

export {
    router
}