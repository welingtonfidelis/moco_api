import { Router } from "express";
import { authValidateMidleware, roleValidateMidleware } from "../middlewares/Auth";
import { noAuthRouter } from "./noAuth";
import { cashRegisterRouter } from "./cashRegister";
import { cashRegisterGroupRouter } from "./cashRegisterGroup";
import { ongRouter } from "./ong";
import { userRouter } from "./user";
import { ROLES_ENUM } from "../enums/role";

const router = Router();

router.use(noAuthRouter);

router.use(authValidateMidleware);

router.use(cashRegisterRouter);
router.use(cashRegisterGroupRouter);
router.use(userRouter);

router.use(roleValidateMidleware(ROLES_ENUM.ADMIN));
router.use(ongRouter);

export {
    router
}