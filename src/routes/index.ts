import { Router } from "express";
import { authMidleware } from "../middlewares/Auth";
import { authRouter } from "./auth";
import { cashRegisterRouter } from "./cashRegister";
import { cashRegisterGroupRouter } from "./cashRegisterGroup";
import { ongRouter } from "./ong";
import { userRouter } from "./user";

const router = Router();

router.use(authRouter);

// router.use(authMidleware);

router.use(cashRegisterRouter);
router.use(cashRegisterGroupRouter);
router.use(ongRouter);
router.use(userRouter);

export {
    router
}