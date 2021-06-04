import { Request, Response } from "express"
import { UserService } from "../services/User";
import { ResponseClientService } from "../services/ResponseClient";
import { UserInterface, UserUpdatePasswordInterface, UserUpdateProfileInterface } from "../entities/User";

const responseClientService = new ResponseClientService();
const userService = new UserService();

class UserController {
    async save(req: Request, res: Response) {
        try {
            const data: UserInterface = req.body;
            const { ongId } = req;
            data.ong_id = ongId;
            
            const savedUser = await userService.save(data);
            const responseHandled = responseClientService.successResponse(savedUser);

            return res.json(responseHandled);
        } catch (error) {
            const errorHandled = responseClientService.errorResponse(error);
            return res.status(errorHandled.status_code).json(errorHandled);
        }
    }

    async resetPassword(req: Request, res: Response) {
        try {
            const { email } = req.body;
            
            const savedUser = await userService.resetPassword(email);
            const responseHandled = responseClientService.successResponse(savedUser);

            return res.json(responseHandled);
        } catch (error) {
            const errorHandled = responseClientService.errorResponse(error);
            return res.status(errorHandled.status_code).json(errorHandled);
        }
    }

    async showProfile(req: Request, res: Response) {
        try {
            const { userId, ongId } = req;
            
            const updatedUser = await userService.showProfile(userId, ongId);
            const responseHandled = responseClientService.successResponse(updatedUser);

            return res.json(responseHandled);
        } catch (error) {
            const errorHandled = responseClientService.errorResponse(error);
            return res.status(errorHandled.status_code).json(errorHandled);
        }
    }

    async updateProfile(req: Request, res: Response) {
        try {
            const { name, phone, birth, address } = req.body;
            const { userId, ongId } = req;
            const data: UserUpdateProfileInterface = {
                id: userId,
                ong_id: ongId,
                name,
                phone,
                birth,
                address
            }
            
            const updatedUser = await userService.updateProfile(data);
            const responseHandled = responseClientService.successResponse(updatedUser);

            return res.json(responseHandled);
        } catch (error) {
            const errorHandled = responseClientService.errorResponse(error);
            return res.status(errorHandled.status_code).json(errorHandled);
        }
    }

    async updatePassword(req: Request, res: Response) {
        try {
            const { password } = req.body;
            const { userId, ongId } = req;
            const data: UserUpdatePasswordInterface = {
                id: userId,
                ong_id: ongId,
                password
            }
            
            const updatedUser = await userService.updatePassword(data);
            const responseHandled = responseClientService.successResponse(updatedUser);

            return res.json(responseHandled);
        } catch (error) {
            const errorHandled = responseClientService.errorResponse(error);
            return res.status(errorHandled.status_code).json(errorHandled);
        }
    }
}

export {
    UserController
}