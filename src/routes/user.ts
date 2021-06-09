import { Router } from "express";
import { UserController } from "../controllers/User";
import { ROLES_ENUM } from "../enums/role";
import { roleValidateMidleware } from "../middlewares/Auth";
import { inputValidateMidleware } from "../middlewares/InputValidate";
import { userSaveSchema } from "../middlewares/InputValidate/schemas/user/save";
import { userShowProfileSchema } from "../middlewares/InputValidate/schemas/user/showProfile";
import { userUpdatePasswordSchema } from "../middlewares/InputValidate/schemas/user/updatePassword";
import { userUpdateProfileSchema } from "../middlewares/InputValidate/schemas/user/updateProfile";
import { userUpdateResetedPasswordSchema } from '../middlewares/InputValidate/schemas/user/updateResetedPassword';

const userRouter = Router();
const userController = new UserController();

userRouter.post(
    '/users', 
    [
        inputValidateMidleware(userSaveSchema),
        roleValidateMidleware(ROLES_ENUM.MANAGER)
    ],
    userController.save
);

userRouter.get(
    '/users/profile', 
    inputValidateMidleware(userShowProfileSchema),
    userController.showProfile
);

userRouter.patch(
    '/users/profile', 
    inputValidateMidleware(userUpdateProfileSchema),
    userController.updateProfile
);

userRouter.patch(
    '/users/profile/update-password', 
    inputValidateMidleware(userUpdatePasswordSchema),
    userController.updatePassword
);

userRouter.patch(
    '/users/profile/update-reseted-password', 
    inputValidateMidleware(userUpdateResetedPasswordSchema),
    userController.updateResetedPassword
);

export {
    userRouter
}