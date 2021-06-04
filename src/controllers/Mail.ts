import { Request, Response } from "express";
import { SendMailInterface } from "../entities/Mail";
import { MailService } from "../services/Mail";
import { ResponseClientService } from "../services/ResponseClient";
import { UserService } from "../services/User";

const responseClientService = new ResponseClientService();
const userService = new UserService();
const mailService = new MailService();

const CONTACT_MAIL = process.env.CONTACT_MAIL!;

class MailController {
    async resetUserPassword(req: Request, res: Response) {
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

    async fisrtContact(req: Request, res: Response) {
        try {
            const { from, message } = req.body;

            const data: SendMailInterface = {
                to: CONTACT_MAIL,
                from,
                subject: 'MOCO - Primeiro Contato',
                message
            }

            await mailService.sendOneMail(data);
            const responseHandled = responseClientService.successResponse({});

            return res.json(responseHandled);
        } catch (error) {
            const errorHandled = responseClientService.errorResponse(error);
            return res.status(errorHandled.status_code).json(errorHandled);
        }
    }
}

export {
    MailController
}