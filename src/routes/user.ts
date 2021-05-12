import { Router } from "express";
import { UserController } from "../controllers/User";

const userRouter = Router();
const userController = new UserController();

userRouter.post('/users', userController.save);

export {
    userRouter
}