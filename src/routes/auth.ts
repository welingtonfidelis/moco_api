import { Router } from "express";
import { AuthController } from "../controllers/Auth";
import { UserController } from "../controllers/User";
import { inputValidateMidleware } from "../middlewares/InputValidate";
import { userLoginSchema } from "../middlewares/InputValidate/schemas/user/login";
import { userResetPasswordSchema } from "../middlewares/InputValidate/schemas/user/resetPassword";

const authRouter = Router();
const authController = new AuthController();
const userController = new UserController();

authRouter.post(
    '/users/login', 
    inputValidateMidleware(userLoginSchema), 
    authController.login
);

authRouter.post(
    '/users/profile/reset-password',
    inputValidateMidleware(userResetPasswordSchema),
    userController.resetPassword
);

export {
    authRouter
}