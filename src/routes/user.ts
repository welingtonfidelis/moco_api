import { Router } from "express";
import { UserController } from "../controllers/User";
import { inputValidateMidleware } from "../middlewares/InputValidate";
import { userSaveSchema } from "../middlewares/InputValidate/schemas/user/save";

const userRouter = Router();
const userController = new UserController();

userRouter.post(
    '/users', 
    inputValidateMidleware(userSaveSchema),
    userController.save
);

export {
    userRouter
}