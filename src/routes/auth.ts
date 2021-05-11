import { Router } from "express";
import { AuthController } from "../controllers/Auth";

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/users/login', authController.login);

export {
    authRouter
}