import { Request, Response } from "express"
import { UserService } from "../services/User";
import { ResponseClientService } from "../services/ResponseClient";
import { UserInterface } from "../entities/User";

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
}

export {
    UserController
}